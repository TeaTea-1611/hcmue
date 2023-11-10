import DefaultLayout from "@/components/layouts/default";
import { NextPageWithLayout } from "./_app";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const Home: NextPageWithLayout = () => {
  return (
    <main className="z-10 w-full py-6 mx-auto max-w-7xl">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <section className="group">
            <div className="flex items-center justify-between px-2 mb-4">
              <h2 className="text-lg font-semibold text-accent-foreground">
                Thông báo mới
              </h2>
              <Link
                href="/"
                className="hidden text-sm font-semibold group-hover:block hover:text-primary"
              >
                Xem thêm
              </Link>
            </div>
            <ul className="space-y-6">
              {[...Array(8)].map((_, i) => (
                <li key={i}>
                  <Skeleton className="w-full h-20" />
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="flex flex-col col-span-1">
          <section className="flex-1 group">
            <div className="flex items-center justify-between px-2 mb-4">
              <h2 className="text-lg font-semibold text-accent-foreground">
                Thông báo chung
              </h2>
              <Link
                href="/"
                className="hidden text-sm font-semibold group-hover:block hover:text-primary"
              >
                Xem thêm
              </Link>
            </div>
          </section>
          <section className="group">
            <div className="flex items-center justify-between px-2 mb-4">
              <h2 className="text-lg font-semibold text-accent-foreground">
                Hướng dẫn
              </h2>
              <Link
                href="/information/q&a"
                className="hidden text-sm font-semibold group-hover:block hover:text-primary"
              >
                Xem thêm
              </Link>
            </div>
            <ul className="px-2">
              {/* {FAQ.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/information/q&a?q=${item.id}`}
                    className="text-sm font-medium hover:text-primary"
                  >
                    {item.question}
                  </Link>
                </li>
              ))} */}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
};

Home.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;
