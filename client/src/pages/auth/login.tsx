import AuthLayout from "@/components/layouts/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MeDocument, MeQuery, useLoginMutation } from "@/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Fingerprint, Loader, UserCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { storeLocalStorageToken } from "@/services/auth.service";

const formSchema = z.object({
  username: z
    .string({ required_error: "Bắt buộc" })
    .trim()
    .min(6, { message: "Tối thiểu 6 ký tự" })
    .max(20, { message: "Tối đa 20 ký tự" }),
  password: z
    .string({ required_error: "Bắt buộc" })
    .trim()
    .min(6, { message: "Tối thiểu 6 ký tự" })
    .max(30, { message: "Tối đa 30 ký tự" }),
});

const Login: NextPageWithLayout = () => {
  const [login, { loading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username:
        typeof router.query.username === "string" ? router.query.username : "",
      password:
        typeof router.query.password === "string" ? router.query.password : "",
    },
  });

  const onSubmit = async ({
    username,
    password,
  }: z.infer<typeof formSchema>) => {
    try {
      await login({
        variables: {
          loginInput: {
            username,
            password,
          },
        },
        update: (cache, { data }) => {
          if (
            data?.login?.success &&
            data.login.accessToken &&
            data.login.user
          ) {
            storeLocalStorageToken(data.login.accessToken);
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data.login.user,
              },
            });
          } else {
            form.setError("root", { message: data?.login?.message });
          }
        },
      });
    } catch (error) {}
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Tài khoản</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="border-none outline-none bg-black/80 !ring-offset-0 pr-12 text-slate-300"
                      {...field}
                    />
                    <UserCircle className="absolute w-6 h-6 -translate-y-1/2 cursor-pointer hover:text-primary top-1/2 right-2 text-slate-300" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Mật khẩu</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="border-none outline-none bg-black/80 !ring-offset-0 pr-12 text-slate-300"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <Fingerprint
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute w-6 h-6 -translate-y-1/2 cursor-pointer text-slate-300 hover:text-primary top-1/2 right-2"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root && (
            <div className="font-semibold text-destructive">
              {form.formState.errors.root.message}
            </div>
          )}
          <div className="flex items-center justify-between">
            <Link
              href={"/auth/forgot-password"}
              className="text-sm font-semibold text-slate-300 hover:text-primary"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full text-white"
            disabled={loading}
          >
            {loading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
            Đăng nhập
          </Button>
        </form>
      </Form>
    </>
  );
};

Login.getLayout = (page) => {
  return <AuthLayout title="Đăng nhập">{page}</AuthLayout>;
};

export default Login;