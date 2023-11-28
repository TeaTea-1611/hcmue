import {
  LecturerFragment,
  useRemoveLecturerMutation,
} from "@/__generated__/gql";
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

const RemoveLecturerDialog = ({
  open,
  onOpenChange,
  lecturer,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lecturer: LecturerFragment;
}) => {
  const [remove, { loading }] = useRemoveLecturerMutation();

  const handleRemove = async () => {
    try {
      const result = await remove({
        variables: {
          removeLecturerId: lecturer.id,
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              faculties(existing) {
                if (data?.removeLecturer?.success) {
                  return existing.filter(
                    (f: any) => f.__ref !== `Lecturer:${lecturer.id}`
                  );
                }
                return existing;
              },
            },
          });
        },
      });
      if (result.data?.removeLecturer.success) {
        toast({ description: result.data.removeLecturer.message });
      } else {
        toast({
          description: result?.data?.removeLecturer.message,
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

export default RemoveLecturerDialog;
