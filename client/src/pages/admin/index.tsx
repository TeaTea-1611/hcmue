import { NextPageWithLayout } from "@/pages/_app";
import AdminLayout from "@/components/layouts/admin";
import Link from "next/link";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <h3 className="mb-1 text-xl font-semibold">Trang quản trị</h3>
    </>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
