import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useApollo } from "@/lib/apollo-client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";
const font = Open_Sans({ subsets: ["latin"] });
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
        >
          <TooltipProvider>
            {getLayout(<Component {...pageProps} />)}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </ApolloProvider>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
    </>
  );
}
