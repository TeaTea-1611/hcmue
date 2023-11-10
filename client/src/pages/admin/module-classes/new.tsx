import AdminLayout from "@/components/layouts/admin";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  CourseInfoFragment,
  Faculty,
  FacultyInfoFragment,
  TrainingField,
  TrainingFieldInfoFragment,
  useCreateStudentMutation,
  useStudentCreationFacultiesQuery,
  useTrainingFieldsQuery,
} from "@/generated/graphql";
import { cn } from "@/lib/utils";
import { NextPageWithLayout } from "@/pages/_app";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader } from "lucide-react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
  dob: z.date({
    required_error: "Bắt buộc",
  }),
  pob: z.string(),
  religion: z.string(),
  address: z.string(),
  area: z.string(),
  country: z.string(),
  district: z.string(),
  email: z.string(),
  ethnicity: z.string(),
  fatherName: z.string(),
  gender: z.number(),
  id: z.string(),
  identification: z.string(),
  motherName: z.string(),
  name: z.string().min(3).max(100),
  numberPhone: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      "Số điện thoại không đúng"
    )
    .min(7, { message: "Số điện thoại không đúng" })
    .max(15, { message: "Số điện thoại không đúng" }),
  permanentAddress: z.string(),
  priority: z.boolean(),
  province: z.string(),
  relativeAddress: z.string(),
  relativeName: z.string(),
  relativeNumberPhone: z.string(),
  studentType: z.string(),
  studyStatus: z.string(),
  positionId: z.string(),
  classId: z.string().refine((value) => !!value, { message: "Bắt buộc" }),
  courseId: z.string().refine((value) => !!value, { message: "Bắt buộc" }),
  facultyId: z.string().refine((value) => !!value, { message: "Bắt buộc" }),
  trainingFieldId: z
    .string()
    .refine((value) => !!value, { message: "Bắt buộc" }),
});

const Page: NextPageWithLayout = () => {
  const [createStudent, { loading }] = useCreateStudentMutation();
  const { data: trainingFieldsData } = useTrainingFieldsQuery();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      area: "",
      country: "",
      district: "",
      email: "",
      ethnicity: "",
      fatherName: "",
      gender: 0,
      id: "",
      identification: "",
      motherName: "",
      name: "",
      numberPhone: "",
      password: "",
      permanentAddress: "",
      pob: "",
      priority: false,
      province: "",
      relativeAddress: "",
      relativeName: "",
      relativeNumberPhone: "",
      religion: "",
      studentType: "Chính thức",
      studyStatus: "Còn học",
      username: "",
      positionId: "",
      classId: "",
      courseId: "",
      facultyId: "",
    },
  });

  const onSubmit = async ({
    username,
    classId,
    courseId,
    trainingFieldId,
    password,
    ...values
  }: z.infer<typeof formSchema>) => {
    try {
      const result = await createStudent({
        variables: {
          createStudentInput: {
            ...values,
            dob: `${String(values.dob.getDate()).padStart(2, "0")}/${String(
              values.dob.getMonth() + 1
            ).padStart(2, "0")}/${values.dob.getFullYear()}`,
            classId: parseInt(classId),
            courseId: parseInt(courseId),
            trainingFieldId: parseInt(trainingFieldId),
            username: values.id,
            password: `${String(values.dob.getDate()).padStart(2, "0")}${String(
              values.dob.getMonth() + 1
            ).padStart(2, "0")}${values.dob.getFullYear()}`,
          },
        },
      });
      if (result.data?.createStudent?.success) {
        console.log(result.data);

        toast({
          description: result.data.createStudent.message,
        });
        router.push("/admin/students");
      } else {
        if (result.data?.createStudent?.errors)
          for (let error of result.data.createStudent.errors) {
            form.setError(error.path as any, { message: error.message });
          }
        toast({
          description: "Có lỗi",
          variant: "destructive",
        });
      }
    } catch (error) {}
  };

  return (
    <>
      <h3 className="mb-1 text-xl font-semibold">Thêm sinh viên mới</h3>
      <div className="p-4 rounded-lg shadow-md bg-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="trainingFieldId"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Ngành đào tạo</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("courseId", "");
                        form.setValue("classId", "");
                        form.setValue(
                          "facultyId",
                          trainingFieldsData?.trainingFields.find(
                            (trainingField) =>
                              trainingField.id === form.watch().trainingFieldId
                          )?.faculty.id || ""
                        );
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Ngành đào tạo - Hệ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {trainingFieldsData?.trainingFields.map(
                          (trainingField) => (
                            <SelectItem
                              key={trainingField.id}
                              value={trainingField.id}
                            >
                              {`${trainingField.name} - ${trainingField.trainingSystem.name} ${trainingField.trainingType.name}`}
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
                name="facultyId"
                render={({ field }) => (
                  <FormItem
                    key={
                      trainingFieldsData?.trainingFields.find(
                        (trainingField) =>
                          trainingField.id === form.watch().trainingFieldId
                      )?.faculty.id
                    }
                  >
                    <FormLabel>Khoa</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={
                          trainingFieldsData?.trainingFields.find(
                            (trainingField) =>
                              trainingField.id === form.watch().trainingFieldId
                          )?.faculty.name
                        }
                        disabled
                      />
                    </FormControl>
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
                    <Select
                      onValueChange={field.onChange}
                      key={
                        trainingFieldsData?.trainingFields.find(
                          (trainingField) =>
                            trainingField.id === form.watch().trainingFieldId
                        )?.faculty.id
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {trainingFieldsData?.trainingFields
                          .find(
                            (trainingField) =>
                              trainingField.id === form.watch().trainingFieldId
                          )
                          ?.courses.map((course) => (
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
                    <Select
                      onValueChange={field.onChange}
                      key={
                        trainingFieldsData?.trainingFields.find(
                          (trainingField) =>
                            trainingField.id === form.watch().trainingFieldId
                        )?.faculty.id
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {trainingFieldsData?.trainingFields
                          .find(
                            (trainingField) =>
                              trainingField.id === form.watch().trainingFieldId
                          )
                          ?.faculty.classes.map((cl) => (
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
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MSSV</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="47.01.104.138" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tài khoản</FormLabel>
                    <FormControl>
                      <Input {...field} value={form.watch().id} disabled />
                    </FormControl>
                    <FormDescription>Tài khoản là mssv.</FormDescription>
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
                      <Input {...field} type="password" disabled />
                    </FormControl>
                    <FormDescription>
                      Mật khẩu là ngày sinh sinh viên.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ tên</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nguyễn Văn A" />
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
                    <div className="w-full">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Chọn</span>
                              )}
                              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                          side="bottom"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
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
                      <Input {...field} placeholder="Tp. Hồ Chí Minh" />
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
                      defaultValue={field.value.toString()}
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
                name="ethnicity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dân tộc</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Kinh" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="identification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CMND / CCCD</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="079202038134" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="religion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tôn giáo</FormLabel>
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
                      <Input {...field} placeholder="0123456789" />
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
                      <Input {...field} placeholder="example@gmai.com" />
                    </FormControl>
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
                        <SelectItem value="Chính thức">Chính thức</SelectItem>
                        <SelectItem value="Hợp đồng">Hợp đồng</SelectItem>
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
                          <SelectValue placeholder="Chọn" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Còn học">Còn học</SelectItem>
                        <SelectItem value="Bị đuổi học">Bị đuổi học</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Khu vực</FormLabel>
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
                name="province"
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
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quận / huyện</FormLabel>
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
                  <FormItem className="col-span-full">
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
                name="permanentAddress"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Địa chỉ thường thú</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fatherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ tên cha</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="motherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ tên mẹ</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="relativeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ tên người thân</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="relativeNumberPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại người thân</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="relativeAddress"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Địa chỉ người thân</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
