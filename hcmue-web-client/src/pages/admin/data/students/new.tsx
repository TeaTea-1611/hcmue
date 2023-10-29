import { NextPageWithLayout } from "@/pages/_app";
import AdminLayout from "@/components/layouts/admin";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StudentEnumType,
  StudyStatusEnumType,
  useCreateStudentMutation,
} from "@/generated/graphql";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  id: z.string(),
  name: z.string(),
  gender: z.string(),
  studentType: z.enum([StudentEnumType.Official]),
  studyStatus: z.enum([
    StudyStatusEnumType.Active,
    StudyStatusEnumType.Dropped,
    StudyStatusEnumType.Expelled,
    StudyStatusEnumType.Graduated,
    StudyStatusEnumType.Reserved,
  ]),
});

const Page: NextPageWithLayout = () => {
  const [createStudent, { loading }] = useCreateStudentMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      gender: "0",
      studentType: StudentEnumType.Official,
      studyStatus: StudyStatusEnumType.Active,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createStudent({
        variables: {
          createStudentInput: {
            id: values.id,
            gender: Number(values.gender),
            name: values.name,
            studentType: values.studentType,
            studyStatus: values.studyStatus,
          },
        },
      });
    } catch (error) {}
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-1">Thêm sinh viên mới</h3>
      <div className="rounded-lg p-4 bg-card shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã số sinh viên</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Họ tên</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Nam</SelectItem>
                        <SelectItem value="1">Nữ</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại sinh viên</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại sinh viên" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={StudentEnumType.Official}>
                          Chính thức
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studyStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tình trạng</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tình trạng học" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={StudyStatusEnumType.Active}>
                          Còn học
                        </SelectItem>
                        <SelectItem value={StudyStatusEnumType.Dropped}>
                          Nghỉ học
                        </SelectItem>
                        <SelectItem value={StudyStatusEnumType.Reserved}>
                          Bảo lưu
                        </SelectItem>
                        <SelectItem value={StudyStatusEnumType.Graduated}>
                          Tốt nghiệp
                        </SelectItem>
                        <SelectItem value={StudyStatusEnumType.Expelled}>
                          Bị đuổi học
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
              Thêm
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
