import { StudentFragment, useRemoveStudentMutation } from "@/__generated__/gql";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import React from "react";

const RemoveStudentDialog = ({
  open,
  onOpenChange,
  student,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: StudentFragment;
}) => {
  const [remove, { loading }] = useRemoveStudentMutation();

  const handleRemove = async () => {
    try {
      const result = await remove({
        variables: {
          removeStudentId: student.id,
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              faculties(existing) {
                if (data?.removeStudent?.success) {
                  return existing.filter(
                    (f: any) => f.__ref !== `Student:${student.id}`
                  );
                }
                return existing;
              },
            },
          });
        },
      });
      if (result.data?.removeStudent.success) {
        toast({ description: result.data.removeStudent.message });
      } else {
        toast({
          description: result?.data?.removeStudent.message,
          variant: "destructive",
        });
      }
    } catch {}
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể được hoàn tác. Điều này sẽ xóa vĩnh viễn dữ
            liệu của khoa khỏi máy chủ.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleRemove();
            }}
            disabled={loading}
          >
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveStudentDialog;
