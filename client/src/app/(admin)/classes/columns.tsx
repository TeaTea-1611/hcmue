"use client";

import {
  CourseFragment,
  ClassFragment,
  useRemoveCourseMutation,
  useRemoveClassMutation,
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
import UpdateClassDialog from "./update";
import RemoveClassDialog from "./remove";

export const columns: ColumnDef<ClassFragment>[] = [
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
          Tên
          <CaretSortIcon className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "faculty",
    header: () => <div className="text-left">Khoa</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-left">{row.original.faculty.name}</div>
      );
    },
  },
  {
    accessorKey: "course",
    header: () => <div className="text-left">Khóa</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-left">{row.original.course.name}</div>
      );
    },
  },
  {
    accessorKey: "academicAdvisor",
    header: () => <div className="text-right">Cố vấn học tập</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-right">
          {row.original.academicAdvisor.fullName}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const _class = row.original;
      const [openRemove, setOpenRemove] = useState(false);
      const [openUpdate, setOpenUpdate] = useState(false);

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
                onClick={() => navigator.clipboard.writeText(_class.id)}
              >
                Sao chép ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenRemove(true)}>
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <RemoveClassDialog
            open={openRemove}
            onOpenChange={setOpenRemove}
            _class={_class}
          />
          <UpdateClassDialog
            open={openUpdate}
            onOpenChange={setOpenUpdate}
            _class={_class}
          />
        </>
      );
    },
  },
];
