"use client";

import { useCreateCourseMutation } from "@/__generated__/gql";
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
});

const Page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [createCourse, { loading }] = useCreateCourseMutation();

  const onSubmit = async ({ name }: z.infer<typeof formSchema>) => {
    try {
      const result = await createCourse({
        variables: {
          createCourseInput: {
            name,
          },
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              courses(existing) {
                if (data?.createCourse?.success && data.createCourse.course) {
                  const newCourseRef = cache.identify(data.createCourse.course);

                  return [...existing, { __ref: newCourseRef }];
                }

                return existing;
              },
            },
          });
        },
      });
      if (result.data?.createCourse.success) {
        toast({ description: result.data.createCourse.message });
        router.push("/courses");
      } else if (result.data?.createCourse?.errors) {
        for (let error of result.data.createCourse.errors) {
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
        Khóa học
      </h2>
      <p className="text-sm text-muted-foreground">
        Thêm khóa mới tại đây. Nhấp vào xác nhận khi hoàn tất.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khóa học</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Khóa XX - YYYY" />
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
