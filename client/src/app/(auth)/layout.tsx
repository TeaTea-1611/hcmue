"use client";

import React from "react";
import { useMeQuery } from "@/__generated__/gql";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!loading) {
      if (
        data?.me &&
        (pathname === "/login" ||
          pathname === "/forgot-password" ||
          pathname === "/change-password")
      ) {
        router.replace("/");
      }
    }
  }, [data, loading, router, pathname]);

  return (
    <>
      <section className="bg-[url('/auth-background.jpg')] w-full h-full flex items-center justify-center bg-center bg-repeat bg-cover relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="z-10 max-w-full p-6 mx-2 rounded-md bg-black/80 w-96">
          {children}
        </div>
      </section>
    </>
  );
}
