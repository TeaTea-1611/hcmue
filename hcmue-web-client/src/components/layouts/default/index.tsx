import React from "react";
import Header from "./header";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const DefaultLayout: React.FC<Props> = ({ children, title = "HCMUE" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className="min-h-full mt-80 bg-background">{children}</div>
    </>
  );
};

export default DefaultLayout;
