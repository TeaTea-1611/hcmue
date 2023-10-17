import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateStudentInput = {
  gender: Scalars['Int']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  studentType: StudentEnumType;
  studyStatus: StudyStatusEnumType;
};

export type CreateUserInput = {
  password: Scalars['String']['input'];
  role: UserRoleEnumType;
  username: Scalars['String']['input'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createStudent: StudentMutationResponse;
  createUser: UserMutationResponse;
  login: UserMutationResponse;
  logout: Scalars['Boolean']['output'];
};


export type MutationCreateStudentArgs = {
  createStudentInput: CreateStudentInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationResponse = {
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type New_Types = {
  __typename?: 'New_Types';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  news: Array<News>;
};

export type News = {
  __typename?: 'News';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  type: New_Types;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  user: User;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Student = {
  __typename?: 'Student';
  address: Scalars['String']['output'];
  area: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  district: Scalars['String']['output'];
  dob?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  ethnicity: Scalars['String']['output'];
  fatherName: Scalars['String']['output'];
  gender: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  identification: Scalars['String']['output'];
  motherName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  note: Scalars['String']['output'];
  numberPhone: Scalars['String']['output'];
  permanentAddress: Scalars['String']['output'];
  pob?: Maybe<Scalars['String']['output']>;
  priority: Scalars['Boolean']['output'];
  province: Scalars['String']['output'];
  relativeAddress: Scalars['String']['output'];
  relativeName: Scalars['String']['output'];
  relativeNumberPhone: Scalars['String']['output'];
  religion: Scalars['String']['output'];
  studentType: Scalars['String']['output'];
  studyStatus: Scalars['String']['output'];
  union: Scalars['Boolean']['output'];
  user: User;
  userId: Scalars['Float']['output'];
};

export enum StudentEnumType {
  Official = 'Official'
}

export type StudentMutationResponse = MutationResponse & {
  __typename?: 'StudentMutationResponse';
  message?: Maybe<Scalars['String']['output']>;
  student?: Maybe<Student>;
  success: Scalars['Boolean']['output'];
};

export enum StudyStatusEnumType {
  Active = 'Active',
  Dropped = 'Dropped',
  Expelled = 'Expelled',
  Graduated = 'Graduated',
  Reserved = 'Reserved'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserMutationResponse = MutationResponse & {
  __typename?: 'UserMutationResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export enum UserRoleEnumType {
  Admin = 'Admin',
  Leader = 'Leader',
  Lecturer = 'Lecturer',
  Staff = 'Staff',
  Student = 'Student'
}

export type UserInfoFragment = { __typename?: 'User', id: string, role: string, username: string, createdAt: any };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', message?: string | null, success: boolean, user?: { __typename?: 'User', id: string, role: string, username: string, createdAt: any } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, role: string, username: string, createdAt: any } };

export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  role
  username
  createdAt
}
    `;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    message
    success
    user {
      ...userInfo
    }
  }
}
    ${UserInfoFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;