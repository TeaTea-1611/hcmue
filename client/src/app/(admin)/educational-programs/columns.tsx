"use client";

import {
  EducationalProgramFragment,
  useRemoveEducationalProgramMutation,
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
import UpdateEducationalProgramDialog from "./update";

export const columns: ColumnDef<EducationalProgramFragment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.original.id}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Chương trình đào tạo
          <CaretSortIcon className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "educational-field",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngành
          <CaretSortIcon className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.educationalField.name}</div>,
  },
  {
    accessorKey: "course",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Khóa
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-right">{row.original.course.name}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const educationalProgram = row.original;
      const [remove, { loading: removeLoading }] =
        useRemoveEducationalProgramMutation();
      const [openAlert, setOpenAlert] = useState(false);
      const [openUpdate, setOpenUpdate] = useState(false);

      const handleRemove = async () => {
        try {
          const result = await remove({
            variables: {
              removeEducationalProgramId: educationalProgram.id,
            },
            update: (cache, { data }) => {
              cache.modify({
                fields: {
                  educationalPrograms(existing) {
                    if (data?.removeEducationalProgram?.success) {
                      return existing.filter(
                        (f: any) =>
                          f.__ref !==
                          `EducationalProgram:${educationalProgram.id}`
                      );
                    }
                    return existing;
                  },
                },
              });
            },
          });
          if (result.data?.removeEducationalProgram.success) {
            toast({
              description: result.data.removeEducationalProgram.message,
            });
          } else {
            toast({
              description: result?.data?.removeEducationalProgram.message,
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
                onClick={() =>
                  navigator.clipboard.writeText(educationalProgram.id)
                }
              >
                Sao chép ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
                Chỉnh sửa
              </DropdownMenuItem>
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
          <UpdateEducationalProgramDialog
            open={openUpdate}
            onOpenChange={setOpenUpdate}
            educationalProgram={educationalProgram}
          />
        </>
      );
    },
  },
];
