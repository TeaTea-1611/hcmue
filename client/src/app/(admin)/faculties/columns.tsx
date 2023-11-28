"use client";

import {
  CourseFragment,
  FacultyFragment,
  useRemoveCourseMutation,
  useRemoveFacultyMutation,
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
import UpdateFacultyDialog from "./update";
import RemoveFacultyDialog from "./remove";

export const columns: ColumnDef<FacultyFragment>[] = [
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
          Tên khoa
          <CaretSortIcon className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
    cell: ({ row }) => {
      return <div className="font-medium text-left">{row.original.email}</div>;
    },
  },
  {
    accessorKey: "numberPhone",
    header: () => <div className="text-left">Số điện thoại</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-left">{row.original.numberPhone}</div>
      );
    },
  },
  {
    accessorKey: "address",
    header: () => <div className="text-right">Địa chỉ</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-right">{row.original.address}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const faculty = row.original;
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
                onClick={() => navigator.clipboard.writeText(faculty.id)}
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
          <RemoveFacultyDialog
            open={openRemove}
            onOpenChange={setOpenRemove}
            faculty={faculty}
          />
          <UpdateFacultyDialog
            open={openUpdate}
            onOpenChange={setOpenUpdate}
            faculty={faculty}
          />
        </>
      );
    },
  },
];
