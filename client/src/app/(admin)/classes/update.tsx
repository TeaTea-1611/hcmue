import {
  ClassFragment,
  useCoursesQuery,
  useFacultiesQuery,
  useLecturersQuery,
  useUpdateClassMutation,
} from "@/__generated__/gql";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
  facultyId: z.string(),
  courseId: z.string(),
  academicAdvisorId: z.string(),
});

const UpdateClassDialog = ({
  open,
  onOpenChange,
  _class,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  _class: ClassFragment;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: _class.name,
      facultyId: _class.faculty.id,
      courseId: _class.course.id,
      academicAdvisorId: _class.academicAdvisor.id,
    },
  });

  const [update, { loading }] = useUpdateClassMutation();
  const { data: facultiesData } = useFacultiesQuery();
  const { data: coursesData } = useCoursesQuery();
  const { data: lecturersData } = useLecturersQuery();

  const onSubmit = async ({
    name,
    academicAdvisorId,
    courseId,
    facultyId,
  }: z.infer<typeof formSchema>) => {
    try {
      const result = await update({
        variables: {
          updateClassInput: {
            id: parseInt(_class.id),
            name,
            facultyId: parseInt(facultyId),
            courseId: parseInt(courseId),
            academicAdvisorId,
          },
        },
      });
      if (result.data?.updateClass?.success) {
        toast({ description: result.data?.updateClass.message });
        onOpenChange(false);
      } else if (result.data?.updateClass?.errors) {
        for (let error of result.data?.updateClass.errors) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[580px] max-h-screen">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
          <DialogDescription>Nhấn lưu khi hoàn thành.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Tên</FormLabel>
                  <FormControl>
                    <Input {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facultyId"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Khoa quản lý</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="col-span-3">
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
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Khoá</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="col-span-3">
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
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Cố vấn học tập</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="col-span-3">
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

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading && (
                  <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                )}
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateClassDialog;
