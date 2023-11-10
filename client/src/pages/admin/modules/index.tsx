import { NextPageWithLayout } from "@/pages/_app";
import AdminLayout from "@/components/layouts/admin";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  StudentInfoFragment,
  usePaginatedStudentsQuery,
} from "@/generated/graphql";
import Pagination from "@/components/ui/pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { Plus } from "lucide-react";

const TAKE = 10;

const Page: NextPageWithLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [studentId, setStudentId] = useState("");

  const studentIdDebounce = useDebounce(studentId, 200);

  const { data, refetch } = usePaginatedStudentsQuery({
    variables: { take: TAKE },
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data?.paginatedStudents?.students || [],
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
        pageSize: TAKE,
        pageIndex: 0,
      },
    },
  });

  useEffect(() => {
    if (studentId !== studentIdDebounce)
      refetch({ studentId: studentIdDebounce });
  }, [studentIdDebounce]);

  return (
    <>
      <div className="p-4 rounded-lg shadow-md bg-card">
        <div className="flex items-center justify-between">
          <h3 className="mb-1 text-xl font-semibold">Sinh viên</h3>
          <Link
            href="students/new"
            className="flex items-center font-medium text-primary group"
          >
            <Plus
              size={18}
              className="mr-2 duration-200 ease-in-out group-hover:-translate-x-1"
            />
            <span className="duration-200 ease-in-out group-hover:-translate-x-1">
              Thêm sinh viên mới
            </span>
          </Link>
        </div>
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Lọc mssv..."
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
                        {column.id}
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
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end py-4 space-x-2">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} trên{" "}
              {table.getFilteredRowModel().rows.length} hàng đã được chọn.
            </div>
            <div className="space-x-2">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  (data?.paginatedStudents?.totalCount || 0) / TAKE
                )}
                onPageChange={async (page) => {
                  setCurrentPage(page);
                  await refetch({ pageIndex: page - 1 });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;

export const columns: ColumnDef<StudentInfoFragment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "MSSV",
    accessorKey: "id",
    header: "MSSV",
    cell: ({ row }) => <div className="capitalize">{row.original.id}</div>,
  },
  {
    id: "Họ tên",
    accessorKey: "name",
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
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    id: "Khoa",
    accessorKey: "faculty",
    header: () => <div className="text-left">Khoa</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-left">{row.original.faculty.name}</div>
      );
    },
  },
  {
    id: "Lớp",
    accessorKey: "class",
    header: () => <div className="text-left">Lớp</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-left">{row.original.class.name}</div>
      );
    },
  },
  {
    id: "Tình trạng",
    accessorKey: "studyStatus",
    header: () => <div className="text-right">Tình trạng</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-right">{row.original.studyStatus}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original;

      return (
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
              Sao chép MSSV
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Xem thông tin</DropdownMenuItem>
            <DropdownMenuItem>Đổi mật khẩu</DropdownMenuItem>
            <DropdownMenuItem>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
