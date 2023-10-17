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
import { toast } from "@/components/ui/use-toast";
import { MeDocument, MeQuery, useLoginMutation } from "@/generated/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Fingerprint, Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";

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
    .max(50, { message: "Tối đa 50 ký tự" }),
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login({
        variables: {
          loginInput: values,
        },
        update: (cache, { data }) => {
          if (data?.login.user) {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: data.login.user,
              },
            });
          } else if (data?.login.message) {
            toast({ description: data?.login.message });
          } else {
            toast({
              variant: "destructive",
              description: "Có lỗi",
            });
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
                <FormLabel className="text-white">Username</FormLabel>

                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="example@gmail.com"
                      className="border-none outline-none bg-black/80 !ring-offset-0 pr-12 text-slate-300"
                      type="email"
                      {...field}
                    />
                    <AtSign className="absolute w-6 h-6 -translate-y-1/2 cursor-pointer hover:text-primary top-1/2 right-2" />
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
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="border-none outline-none bg-black/80 !ring-offset-0 pr-12 text-slate-300"
                      placeholder="Mật khẩu từ 6 - 50 ký tự"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <Fingerprint
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute w-6 h-6 -translate-y-1/2 cursor-pointer hover:text-primary top-1/2 right-2"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <Link
              href={"/auth/forgot-password"}
              className="text-sm font-semibold text-slate-300 hover:text-primary"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
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
