import {
  LecturerFragment,
  useUpdateLecturerMutation,
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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
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
  facultyId: z.string(),
  fullName: z.string(),
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
});

const UpdateLecturerDialog = ({
  open,
  onOpenChange,
  lecturer,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lecturer: LecturerFragment;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: lecturer.fullName,
      gender: lecturer.gender,
      joinDate: lecturer.joinDate,
      address: lecturer.address,
      bankAccountNumber: lecturer.bankAccountNumber,
      bankName: lecturer.bankName,
      citizenIdentification: lecturer.citizenIdentification,
      city: lecturer.city,
      country: lecturer.country,
      district: lecturer.district,
      dob: lecturer.dob,
      email: lecturer.email,
      ethnicity: lecturer.ethnicity,
      facultyId: lecturer.faculty.id,
      numberPhone: lecturer.numberPhone,
      partyMembershipStatus: lecturer.partyMembershipStatus,
      permanentAddress: lecturer.permanentAddress,
      pob: lecturer.pob,
      priorityArea: lecturer.priorityArea,
      region: lecturer.region,
      religion: lecturer.religion,
      targetGroup: lecturer.targetGroup,
    },
  });

  const [update, { loading }] = useUpdateLecturerMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await update({
        variables: {
          updateLecturerInput: {
            id: lecturer.id,
            ...values,
            facultyId: parseInt(values.facultyId),
          },
        },
      });
      if (result.data?.updateLecturer?.success) {
        toast({ description: result.data?.updateLecturer.message });
        onOpenChange(false);
      } else if (result.data?.updateLecturer?.errors) {
        for (let error of result.data?.updateLecturer.errors) {
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
              name="fullName"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Họ tên</FormLabel>
                  <FormControl>
                    <Input {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberPhone"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Số điện thoại</FormLabel>
                  <FormControl>
                    <Input {...field} className="col-span-3" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Địa chỉ</FormLabel>
                  <FormControl>
                    <Input {...field} className="col-span-3" />
                  </FormControl>
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

export default UpdateLecturerDialog;
