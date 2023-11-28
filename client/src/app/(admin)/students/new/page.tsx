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
  useClassesQuery,
  useCoursesQuery,
  useCreateStudentMutation,
  useEducationalFieldsQuery,
  useEducationalProgramsQuery,
  useFacultiesQuery,
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
  id: z.string().min(6),
  address: z.string(),
  bankAccountNumber: z.string(),
  bankName: z.string(),
  citizenIdentification: z.string(),
  city: z.string(),
  country: z.string(),
  district: z.string(),
  dob: z.string(),
  email: z.string(),
  ethnicity: z.string(),
  facultyId: z.string().refine((val) => !!val, { message: "bắt buộc" }),
  fullName: z.string().refine((val) => !!val, { message: "bắt buộc" }),
  gender: z.string(),
  joinDate: z.string(),
  numberPhone: z.string(),
  partyMembershipStatus: z.string(),
  permanentAddress: z.string(),
  pob: z.string(),
  priorityArea: z.string(),
  region: z.string(),
  religion: z.string(),
  targetGroup: z.string(),
  username: z.string().min(6).max(50),
  password: z.string().min(6),
  classId: z.string().refine((val) => !!val, { message: "bắt buộc" }),
  courseId: z.string().refine((val) => !!val, { message: "bắt buộc" }),
  educationalFieldId: z
    .string()
    .refine((val) => !!val, { message: "bắt buộc" }),
  educationalProgramId: z
    .string()
    .refine((val) => !!val, { message: "bắt buộc" }),
  enrollmentStatus: z.string(),
  position: z.string(),
  registrations: z.string(),
  studentType: z.string(),
});

const Page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      fullName: "",
      gender: "nam",
      address: "",
      bankAccountNumber: "",
      bankName: "",
      citizenIdentification: "",
      city: "",
      country: "Vietnam",
      district: "",
      dob: "",
      pob: "",
      email: "",
      ethnicity: "",
      facultyId: "",
      joinDate: "",
      numberPhone: "",
      partyMembershipStatus: "",
      permanentAddress: "",
      priorityArea: "",
      region: "",
      religion: "",
      targetGroup: "",
      username: "",
      password: "",
      enrollmentStatus: "",
      position: "",
      registrations: "",
      studentType: "",
      classId: "",
      courseId: "",
      educationalFieldId: "",
      educationalProgramId: "",
    },
  });

  const [createStudent, { loading }] = useCreateStudentMutation();
  const { data: facultiesData } = useFacultiesQuery();
  const { data: coursesData } = useCoursesQuery();
  const { data: classesData } = useClassesQuery();
  const { data: educationalFieldsData } = useEducationalFieldsQuery();
  const { data: educationalProgramsData } = useEducationalProgramsQuery();

  const onSubmit = async ({
    facultyId,
    classId,
    educationalProgramId,
    courseId,
    ...values
  }: z.infer<typeof formSchema>) => {
    try {
      const result = await createStudent({
        variables: {
          createStudentInput: {
            ...values,
            facultyId: parseInt(facultyId),
            classId: parseInt(classId),
            courseId: parseInt(courseId),
            educationalProgramIds: [educationalProgramId],
          },
        },
        // update: (cache, { data }) => {
        //   cache.modify({
        //     fields: {
        //       students(existing) {
        //         if (
        //           data?.createStudent?.success &&
        //           data.createStudent.student
        //         ) {
        //           const newStudentRef = cache.identify(
        //             data.createStudent.student
        //           );
        //           return {
        //             totalCount: existing?.totalCount,
        //             students: [...existing.students, { __ref: newStudentRef }],
        //           };
        //         }
        //         return existing;
        //       },
        //     },
        //   });
        // },
      });
      if (result.data?.createStudent?.success) {
        toast({ description: result.data?.createStudent.message });
        router.push("/students");
      } else if (result.data?.createStudent?.errors) {
        for (let error of result.data?.createStudent.errors) {
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
        Sinh viên
      </h2>
      <p className="text-sm text-muted-foreground">
        Thêm sinh viên tại đây. Nhấp vào xác nhận khi hoàn tất.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã số sinh viên</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
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
                  <Select onValueChange={field.onChange} defaultValue="nam">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nam">Nam</SelectItem>
                      <SelectItem value="nữ">Nữ</SelectItem>
                    </SelectContent>
                  </Select>
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
            <FormField
              control={form.control}
              name="numberPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SĐT</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankAccountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số tài khoản ngân hàng</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngân hàng</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày sinh</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nơi sinh</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permanentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ thường trú</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tỉnh / Thành phố</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quốc gia</FormLabel>
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
                      {coursesData?.courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
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
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lớp</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classesData?.classes.map((cl) => (
                        <SelectItem key={cl.id} value={cl.id}>
                          {cl.name}
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
                      {educationalFieldsData?.educationalFields.map((ef) => (
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
              name="educationalProgramId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chương trình đào tạo</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {educationalProgramsData?.educationalPrograms.map(
                        (ep) => (
                          <SelectItem key={ep.id} value={ep.id}>
                            {ep.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tài khoản đăng nhập</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
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
