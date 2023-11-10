import { useAuth } from "@/utils/useAuth";
import Head from "next/head";
import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<Props> = ({ children, title }) => {
  const {} = useAuth();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="bg-[url('/auth-background.jpg')] w-full h-full flex items-center justify-center bg-center bg-repeat bg-cover relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="z-10 max-w-full p-6 mx-2 rounded-md bg-black/80 w-96">
          <div className="flex flex-col items-center justify-center py-6">
            <Link href={"/"}>
              <img src="/logo.png" alt="logo" className="w-auto h-20" />
            </Link>
            <h2 className="mt-2 text-3xl font-semibold text-white">{title}</h2>
          </div>
          {children}
        </div>
      </section>
    </>
  );
};

export default AuthLayout;
