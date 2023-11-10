import {
  ApolloClient,
  ApolloLink,
  Observable,
  createHttpLink,
} from "@apollo/client";
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache";
import merge from "deepmerge";
import { isEqual } from "lodash";
import { useMemo } from "react";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { jwtDecode } from "jwt-decode";
import {
  deleteLocalStorageToken,
  getLocalStorageToken,
  storeLocalStorageToken,
} from "@/services/auth.service";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const token = getLocalStorageToken();

          if (token) {
            operation.setContext({
              headers: {
                authorization: `Bearer ${token}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

let apolloClient: ApolloClient<NormalizedCacheObject>;

interface IApolloStateProps {
  [APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject;
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = getLocalStorageToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: ApolloLink.from([
      errorLink,
      new TokenRefreshLink({
        accessTokenField: "accessToken",
        isTokenValidOrUndefined: async () => {
          const token = getLocalStorageToken();
          if (token) {
            const tokenPayload = jwtDecode(token);

            return tokenPayload
              ? (tokenPayload.exp as number) > Date.now() / 1000
              : false;
          } else {
            return true;
          }
        },
        fetchAccessToken: () => {
          return fetch("http://localhost:4000/refresh-token", {
            method: "POST",
            credentials: "include",
          });
        },
        handleFetch: (accessToken) => {
          storeLocalStorageToken(accessToken);
        },
        handleError: (err) => {
          deleteLocalStorageToken();
          console.warn("Your refresh token is invalid. Try to re-login");
        },
      }),
      requestLink,
      authLink.concat(httpLink),
    ]),
    cache,
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | undefined | null = null
) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: { props: IApolloStateProps }
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: IApolloStateProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
