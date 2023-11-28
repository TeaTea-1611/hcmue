import { ClassFragment, useRemoveClassMutation } from "@/__generated__/gql";
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

const RemoveClassDialog = ({
  open,
  onOpenChange,
  _class,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  _class: ClassFragment;
}) => {
  const [remove, { loading }] = useRemoveClassMutation();

  const handleRemove = async () => {
    try {
      const result = await remove({
        variables: {
          removeClassId: parseInt(_class.id),
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              faculties(existing) {
                if (data?.removeClass?.success) {
                  return existing.filter(
                    (f: any) => f.__ref !== `Class:${_class.id}`
                  );
                }
                return existing;
              },
            },
          });
        },
      });
      if (result.data?.removeClass.success) {
        toast({ description: result.data.removeClass.message });
      } else {
        toast({
          description: result?.data?.removeClass.message,
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

export default RemoveClassDialog;
