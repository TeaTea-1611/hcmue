import { useMeQuery } from "@/generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();

  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!loading) {
      if (
        data?.me &&
        (router.route === "/auth/login" ||
          router.route === "/auth/register" ||
          router.route === "/auth/forgot-password" ||
          router.route === "/auth/change-password" ||
          router.route === "/auth/activate-account/send-email")
      ) {
        if (router.query.back) router.back();
        else router.replace("/");
      }
    }
  }, [data, loading, router]);

  return { data, loading };
};
