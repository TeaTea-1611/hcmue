"use client";

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
import { useCreateFacultyMutation } from "@/__generated__/gql";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  numberPhone: z.string(),
  address: z.string(),
});

const Page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      numberPhone: "",
    },
  });

  const [createFaculty, { loading }] = useCreateFacultyMutation();

  const onSubmit = async ({
    name,
    email,
    numberPhone,
    address,
  }: z.infer<typeof formSchema>) => {
    try {
      const result = await createFaculty({
        variables: {
          createFacultyInput: {
            name,
            email,
            numberPhone,
            address,
          },
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              faculties(existing) {
                if (
                  data?.createFaculty?.success &&
                  data.createFaculty.faculty
                ) {
                  const newFacultyRef = cache.identify(
                    data.createFaculty.faculty
                  );
                  return [...existing, { __ref: newFacultyRef }];
                }
                return existing;
              },
            },
          });
        },
      });
      if (result.data?.createFaculty?.success) {
        toast({ description: result.data?.createFaculty.message });
        router.push("/faculties");
      } else if (result.data?.createFaculty?.errors) {
        for (let error of result.data?.createFaculty.errors) {
          form.setError(error.field as any, {
            message: error.message,
          });
        }
      } else {
        toast({ description: "Lỗi", variant: "destructive" });
      }
    } catch {
      toast({ description: "Lỗi", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">
        Khoa
      </h2>
      <p className="text-sm text-muted-foreground">
        Thêm khoa mới tại đây. Nhấp vào xác nhận khi hoàn tất.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên khoa</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading && <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />}
            Xác nhận
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
