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
  useStudentQuery,
  useUpdateStudentMutation,
} from "@/__generated__/gql";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
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

  const params = useParams();

  const { data } = useStudentQuery({
    variables: {
      studentId: params.id as string,
    },
    fetchPolicy: "no-cache",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      address: "",
      bankAccountNumber: "",
      bankName: "",
      citizenIdentification: "",
      city: "",
      country: "",
      district: "",
      dob: "",
      email: "",
      ethnicity: "",
      facultyId: "",
      fullName: "",
      gender: "",
      joinDate: "",
      numberPhone: "",
      partyMembershipStatus: "",
      permanentAddress: "",
      pob: "",
      priorityArea: "",
      region: "",
      religion: "",
      targetGroup: "",
      classId: "",
      courseId: "",
      educationalFieldId: "",
      educationalProgramId: "",
      enrollmentStatus: "",
      position: "",
      registrations: "",
      studentType: "",
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (data?.student) {
        form.reset({
          id: data.student.id,
          fullName: data.student.fullName,
          gender: data.student.gender,
          address: data.student.address,
          bankAccountNumber: data.student.bankAccountNumber,
          bankName: data.student.bankName,
          citizenIdentification: data.student.citizenIdentification,
          city: data.student.city,
          country: data.student.country,
          district: data.student.district,
          dob: data.student.dob,
          pob: data.student.pob,
          email: data.student.email,
          ethnicity: data.student.ethnicity,
          facultyId: data.student.faculty.id,
          joinDate: data.student.joinDate,
          numberPhone: data.student.numberPhone,
          partyMembershipStatus: data.student.partyMembershipStatus,
          permanentAddress: data.student.permanentAddress,
          priorityArea: data.student.priorityArea,
          region: data.student.region,
          religion: data.student.religion,
          targetGroup: data.student.targetGroup,
          enrollmentStatus: data.student.enrollmentStatus,
          position: data.student.position,
          registrations: data.student.registrations,
          studentType: data.student.studentType,
          classId: data.student.class.id,
          courseId: data.student.course.id,
          educationalFieldId: data.student.educationalField.id,
          educationalProgramId: data.student.educationalPrograms[0].id,
        });
      }
    });
  }, [data?.student]);

  const [updateStudent, { loading }] = useUpdateStudentMutation();
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
    if (!data?.student) return;

    try {
      const result = await updateStudent({
        variables: {
          updateStudentInput: {
            ...values,
            facultyId: parseInt(facultyId),
            classId: parseInt(classId),
            courseId: parseInt(courseId),
            educationalProgramIds: [educationalProgramId],
          },
        },
      });
      if (result.data?.updateStudent?.success) {
        toast({ description: result.data?.updateStudent.message });
        router.push("/students");
      } else if (result.data?.updateStudent?.errors) {
        for (let error of result.data?.updateStudent.errors) {
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
        Chỉnh sửa thông tin tại đây. Nhấp vào xác nhận khi hoàn tất.
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
                    <Input {...field} disabled />
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
