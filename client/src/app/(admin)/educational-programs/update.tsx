import {
  EducationalProgramFragment,
  useCoursesQuery,
  useEducationalFieldsQuery,
  useUpdateEducationalProgramMutation,
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
  name: z.string().refine((val) => !!val, { message: "bắt buộc" }),
  educationalFieldId: z
    .string()
    .refine((val) => !!val, { message: "bắt buộc" }),
  courseId: z.string().refine((val) => !!val, { message: "bắt buộc" }),
});

const UpdateEducationalProgramDialog = ({
  open,
  onOpenChange,
  educationalProgram,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  educationalProgram: EducationalProgramFragment;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: educationalProgram.name,
      educationalFieldId: educationalProgram.educationalField.id,
      courseId: educationalProgram.course.id,
    },
  });

  const [update, { loading }] = useUpdateEducationalProgramMutation();

  const { data: educationalFieldData } = useEducationalFieldsQuery();

  const { data: coursesData } = useCoursesQuery();

  const onSubmit = async ({
    name,
    courseId,
    educationalFieldId,
  }: z.infer<typeof formSchema>) => {
    try {
      const result = await update({
        variables: {
          updateEducationalProgramInput: {
            id: educationalProgram.id,
            name,
            educationalFieldId,
            courseId: parseInt(courseId),
          },
        },
      });
      if (result.data?.updateEducationalProgram?.success) {
        toast({ description: result.data?.updateEducationalProgram.message });
        onOpenChange(false);
      } else if (result.data?.updateEducationalProgram?.errors) {
        for (let error of result.data?.updateEducationalProgram.errors) {
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
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin khoa</DialogTitle>
          <DialogDescription>Nhấn lưu khi hoàn thành.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">
                    Tên chương trình đào tạo
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="educationalFieldId"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Ngành đào tạo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={educationalProgram.educationalField.id}
                  >
                    <FormControl>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Hệ đào tạo - Loại hình đào tạo" />
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
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Khóa học</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={educationalProgram.course.id}
                  >
                    <FormControl>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Chọn khoa" />
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

export default UpdateEducationalProgramDialog;
