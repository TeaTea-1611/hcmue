"use client";

import { useCreateEducationalSystemMutation } from "@/__generated__/gql";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  type: z.string(),
});

const Page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  });

  const [createEducationalSystem, { loading }] =
    useCreateEducationalSystemMutation();

  const onSubmit = async ({ name, type }: z.infer<typeof formSchema>) => {
    try {
      const result = await createEducationalSystem({
        variables: {
          createEducationalSystemInput: {
            name,
            type,
          },
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              educationalSystems(existing) {
                if (
                  data?.createEducationalSystem?.success &&
                  data.createEducationalSystem.educationalSystem
                ) {
                  const newEducationalSystemRef = cache.identify(
                    data.createEducationalSystem.educationalSystem
                  );

                  return [...existing, { __ref: newEducationalSystemRef }];
                }

                return existing;
              },
            },
          });
        },
      });
      if (result.data?.createEducationalSystem.success) {
        toast({ description: result.data.createEducationalSystem.message });
        router.push("/educational-systems");
      } else if (result.data?.createEducationalSystem?.errors) {
        for (let error of result.data.createEducationalSystem.errors) {
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
        Hệ đào tạo
      </h2>
      <p className="text-sm text-muted-foreground">
        Thêm hệ đào tạo mới tại đây. Nhấp vào xác nhận khi hoàn tất.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hệ đào tạo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Đại học" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại hình đào tạo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Chính quy" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
