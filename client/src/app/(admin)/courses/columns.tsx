"use client";

import { CourseFragment, useRemoveCourseMutation } from "@/__generated__/gql";
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export const columns: ColumnDef<CourseFragment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.original.id}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Khóa học
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="text-right">{row.original.name}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const course = row.original;
      const [remove, { loading: removeLoading }] = useRemoveCourseMutation();
      const [openAlert, setOpenAlert] = useState(false);

      const handleRemove = async () => {
        try {
          const result = await remove({
            variables: {
              removeCourseId: parseInt(course.id),
            },
            update: (cache, { data }) => {
              cache.modify({
                fields: {
                  courses(existing) {
                    if (data?.removeCourse?.success) {
                      return existing.filter(
                        (f: any) => f.__ref !== `Course:${course.id}`
                      );
                    }
                    return existing;
                  },
                },
              });
            },
          });
          if (result.data?.removeCourse.success) {
            toast({ description: result.data.removeCourse.message });
          } else {
            toast({
              description: result?.data?.removeCourse.message,
              variant: "destructive",
            });
          }
        } catch {}
        setOpenAlert(false);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(course.id)}
              >
                Sao chép ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenAlert(true)}>
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
            <AlertDialogTrigger asChild>
              <button className="hidden"></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc muốn xóa?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này không thể được hoàn tác. Điều này sẽ xóa vĩnh
                  viễn dữ liệu khỏi máy chủ.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove();
                  }}
                  disabled={removeLoading}
                >
                  Xác nhận
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
