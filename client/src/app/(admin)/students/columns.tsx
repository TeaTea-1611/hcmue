"use client";

import { StudentFragment } from "@/__generated__/gql";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import RemoveLecturerDialog from "./remove";

export const columns: ColumnDef<StudentFragment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.original.id}</div>,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Họ tên
          <CaretSortIcon className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.fullName}</div>,
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
    accessorKey: "educationalField",
    header: () => <div className="text-right">Ngành đào tạo</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-right">
          {row.original.educationalField.name}
        </div>
      );
    },
  },
  {
    accessorKey: "educationalPrograms",
    header: () => <div className="text-right">Chương trình đào tạo</div>,
    cell: ({ row }) => {
      return (
        <ul className="font-medium text-right">
          {row.original.educationalPrograms.map((ep) => (
            <li key={ep.id}>{ep.name}</li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "faculty",
    header: () => <div className="text-right">Khoa</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-right">
          {row.original.faculty.name}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original;
      const [openRemove, setOpenRemove] = useState(false);

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
                onClick={() => navigator.clipboard.writeText(student.id)}
              >
                Sao chép ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`students/${student.id}`}>Chỉnh sửa</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenRemove(true)}>
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <RemoveLecturerDialog
            open={openRemove}
            onOpenChange={setOpenRemove}
            student={student}
          />
        </>
      );
    },
  },
];
