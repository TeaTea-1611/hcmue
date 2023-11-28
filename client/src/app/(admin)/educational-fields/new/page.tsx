"use client";

import {
  useCreateEducationalFieldMutation,
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
  id: z.string(),
  name: z.string(),
  educationalSystemId: z
    .string()
    .refine((val) => !!val, { message: "bắt buộc" }),
  facultyId: z.string().refine((val) => !!val, { message: "bắt buộc" }),
});

const Page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      facultyId: "",
      educationalSystemId: "",
    },
  });

  const [createEducationalField, { loading }] =
    useCreateEducationalFieldMutation();

  const { data: educationalSystemData } = useEducationalSystemsQuery();

  const { data: facultiesData } = useFacultiesQuery();

  const onSubmit = async ({
    name,
    id,
    educationalSystemId,
    facultyId,
  }: z.infer<typeof formSchema>) => {
    try {
      const result = await createEducationalField({
        variables: {
          createEducationalFieldInput: {
            id,
            name,
            educationalSystemId: parseInt(educationalSystemId),
            facultyId: parseInt(facultyId),
          },
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              educationalFields(existing) {
                if (
                  data?.createEducationalField?.success &&
                  data.createEducationalField.educationalField
                ) {
                  const newEducationalFieldRef = cache.identify(
                    data.createEducationalField.educationalField
                  );

                  return [...existing, { __ref: newEducationalFieldRef }];
                }

                return existing;
              },
            },
          });
        },
      });
      if (result.data?.createEducationalField.success) {
        toast({ description: result.data.createEducationalField.message });
        router.push("/educational-fields");
      } else if (result.data?.createEducationalField?.errors) {
        for (let error of result.data.createEducationalField.errors) {
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
        Ngành đào tạo
      </h2>
      <p className="text-sm text-muted-foreground">
        Thêm ngành đào tạo mới tại đây. Nhấp vào xác nhận khi hoàn tất.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mã ngành đào tạo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="7480201" />
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
                <FormLabel>Ngành đào tạo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Công nghệ thông tin" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="educationalSystemId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hệ đào tạo</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Hệ đào tạo - Loại hình đào tạo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {educationalSystemData?.educationalSystems.map((es) => (
                      <SelectItem key={es.id} value={es.id}>
                        {es.name} - {es.type}
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
            name="facultyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Khoa quản lý</FormLabel>
                <Select onValueChange={field.onChange}>
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
