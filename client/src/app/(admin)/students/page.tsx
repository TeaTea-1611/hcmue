"use client";

import { useLecturersQuery, useStudentsQuery } from "@/__generated__/gql";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

const LIMIT = 10;

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [studentId, setStudentId] = useState("");

  const studentIdDebounce = useDebounce(studentId, 200);

  const { data, refetch } = useStudentsQuery({
    variables: {
      take: LIMIT,
    },
    fetchPolicy: "no-cache",
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data?.students.students || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageSize: LIMIT,
        pageIndex: 0,
      },
    },
  });

  useEffect(() => {
    if (studentId !== studentIdDebounce) refetch({ id: studentIdDebounce });
  }, [studentIdDebounce]);

  return (
    <>
      <div className="w-full">
        <div className="mb-6 space-y-2">
          <h2 className="text-2xl font-semibold leading-none tracking-tight">
            Sinh viên
          </h2>
        </div>
        <div className="flex items-center mb-6 space-x-2">
          <Button variant={"outline"} asChild>
            <Link href="students/new">Thêm sinh viên</Link>
          </Button>
        </div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Lọc ID"
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Cột <ChevronDownIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {
                        {
                          id: "ID",
                          fullName: "Họ tên",
                          email: "Email",
                          numberPhone: "SĐT",
                          educationalField: "Ngành đào tạo",
                          educationalPrograms: "Chương trình đào tạo",
                          faculty: "Khoa",
                        }[`${column.id}`]
                      }
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Không có bản ghi
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end py-4 space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {data?.students.totalCount} sinh viên
          </div>
          <div className="space-x-2">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil((data?.students?.totalCount || 0) / LIMIT)}
              onPageChange={async (page) => {
                setCurrentPage(page);
                await refetch({ pageIndex: page - 1 });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
