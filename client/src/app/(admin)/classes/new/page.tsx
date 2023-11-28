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
import {
  useCoursesQuery,
  useCreateClassMutation,
  useFacultiesQuery,
  useLecturersQuery,
} from "@/__generated__/gql";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string(),
  facultyId: z.string().refine((val) => !!val, { message: "bắt buộc" }),
  courseId: z.string().refine((val) => !!val, { message: "bắt buộc" }),
  academicAdvisorId: z.string().refine((val) => !!val, { message: "bắt buộc" }),
});

const Page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      facultyId: "",
      courseId: "",
      academicAdvisorId: "",
    },
  });

  const [createClass, { loading }] = useCreateClassMutation();
  const { data: facultiesData } = useFacultiesQuery();
  const { data: coursesData } = useCoursesQuery();
  const { data: lecturersData } = useLecturersQuery();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await createClass({
        variables: {
          createClassInput: {
            ...values,
            facultyId: parseInt(values.facultyId),
            courseId: parseInt(values.courseId),
          },
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              classes(existing) {
                if (data?.createClass?.success && data.createClass.class) {
                  const newClassRef = cache.identify(data.createClass.class);
                  return [...existing, { __ref: newClassRef }];
                }
                return existing;
              },
            },
          });
        },
      });
      if (result.data?.createClass?.success) {
        toast({ description: result.data?.createClass.message });
        router.push("/classes");
      } else if (result.data?.createClass?.errors) {
        for (let error of result.data?.createClass.errors) {
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
        Lớp
      </h2>
      <p className="text-sm text-muted-foreground">
        Thêm lớp mới tại đây. Nhấp vào xác nhận khi hoàn tất.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facultyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khoa quản lý</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn khoa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {facultiesData?.faculties.map((faculty) => (
                        <SelectItem key={faculty.id} value={faculty.id}>
                          {faculty.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khoá</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {coursesData?.courses.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="academicAdvisorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cố vấn học tập</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lecturersData?.lecturers.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
