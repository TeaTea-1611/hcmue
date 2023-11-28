"use client";

import {
  useCoursesQuery,
  useCreateEducationalProgramMutation,
  useEducationalFieldsQuery,
  useEducationalSystemsQuery,
  useFacultiesQuery,
} from "@/__generated__/gql";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  id: z.string().refine((val) => !!val, { message: "bắt buộc" }),
  name: z.string().refine((val) => !!val, { message: "bắt buộc" }),
  educationalFieldId: z
    .string()
    .refine((val) => !!val, { message: "bắt buộc" }),
  courseId: z.string().refine((val) => !!val, { message: "bắt buộc" }),
});

const Page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      educationalFieldId: "",
      courseId: "",
    },
  });

  const [createEducationalProgram, { loading }] =
    useCreateEducationalProgramMutation();

  const { data: educationalFieldData } = useEducationalFieldsQuery();

  const { data: coursesData } = useCoursesQuery();

  const onSubmit = async ({
    name,
    id,
    courseId,
    educationalFieldId,
  }: z.infer<typeof formSchema>) => {
    try {
      const result = await createEducationalProgram({
        variables: {
          createEducationalProgramInput: {
            id,
            name,
            educationalFieldId,
            courseId: parseInt(courseId),
          },
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              educationalPrograms(existing) {
                if (
                  data?.createEducationalProgram?.success &&
                  data.createEducationalProgram.educationalProgram
                ) {
                  const newEducationalProgramRef = cache.identify(
                    data.createEducationalProgram.educationalProgram
                  );

                  return [...existing, { __ref: newEducationalProgramRef }];
                }

                return existing;
              },
            },
          });
        },
      });
      if (result.data?.createEducationalProgram.success) {
        toast({ description: result.data.createEducationalProgram.message });
        router.push("/educational-programs");
      } else if (result.data?.createEducationalProgram?.errors) {
        for (let error of result.data.createEducationalProgram.errors) {
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
        Chương trình đào tạo
      </h2>
      <p className="text-sm text-muted-foreground">
        Thêm chương trình đào tạo mới tại đây. Nhấp vào xác nhận khi hoàn tất.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mã chương trình đào tạo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="K477480201" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chương trình đào tạo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Công nghệ thông tin" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="educationalFieldId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngành đào tạo</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {educationalFieldData?.educationalFields.map((ef) => (
                      <SelectItem key={ef.id} value={ef.id}>
                        {ef.name}
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
                <FormLabel>Khóa học</FormLabel>
                <Select onValueChange={field.onChange}>
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
