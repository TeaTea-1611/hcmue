import { NextPageWithLayout } from "@/pages/_app";
import AdminLayout from "@/components/layouts/admin";
import Link from "next/link";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-1">Sinh viên</h3>
      <div className="mb-2">Danh sách các sinh viên</div>
      <div className="rounded-lg p-4 bg-card shadow-md">
        <div className="flex items-center justify-between">
          <Link href={"/admin/data/students/new"}>Thêm sinh viên mới</Link>
        </div>
      </div>
    </>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
