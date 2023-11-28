"use client";

import { useMeQuery } from "@/__generated__/gql";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AlignJustifyIcon, ChevronLeftIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import AdminNavLink from "./admin-nav-link";
import MyMenu from "@/components/menu/my-menu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading, client } = useMeQuery();
  const [forbidden, setForbidden] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!data?.me) {
        router.push("/login");
      }
      if (data?.me?.role !== "quản trị") {
        setForbidden(true);
      }
    }
  }, [data, loading]);

  return loading || !data?.me ? (
    <div className="w-full h-full flex items-center justify-center">
      <img src="/logo.png" alt="logo" className="h-20 w-auto" />
    </div>
  ) : (
    <>
      <Sidebar />
      <div className="relative lg:pl-64">
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 bg-white border-b h-14 dark:border-slate-300/10 backdrop-blur border-slate-900/10 bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
          <div className="flex items-center space-x-2">
            {!loading && data?.me?.role === "quản trị" ? (
              <>
                <MobileSidebar />
                <Button
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => router.back()}
                >
                  <ChevronLeftIcon size={18} />
                </Button>
              </>
            ) : (
              <Skeleton className="h-9 w-9" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              {!data?.me ? (
                <>
                  <div className="flex flex-col items-end justify-between h-8 animate-pulse">
                    <Skeleton className="w-24 h-3.5" />
                    <Skeleton className="w-48 h-3.5" />
                  </div>
                  <Skeleton className="rounded-full w-9 h-9" />
                </>
              ) : (
                <MyMenu me={data.me} />
              )}
            </div>
          </div>
        </header>
        <div className="min-h-[calc(100vh-96px)] p-4">
          {forbidden ? (
            <div className="flex items-center justify-center w-full h-full">
              <h2>Bạn không có quyền truy cập</h2>
            </div>
          ) : (
            children
          )}
        </div>
        <footer className="px-6 py-2">
          <p> © HCMUE 2023 </p>
        </footer>
      </div>
    </>
  );
}

interface SidebarItem {
  title: string;
  children: {
    label: string;
    slug: string;
  }[];
}

const Items: SidebarItem[] = [
  {
    title: "Bảng dữ liệu",
    children: [
      {
        label: "Sinh Viên",
        slug: "students",
      },
      {
        label: "Giảng Viên",
        slug: "lecturers",
      },
      {
        label: "Lớp",
        slug: "classes",
      },
      {
        label: "Khoa",
        slug: "faculties",
      },
      {
        label: "Khóa Học",
        slug: "courses",
      },
      {
        label: "Hệ Đào Tạo",
        slug: "educational-systems",
      },
      {
        label: "Ngành Đào Tạo",
        slug: "educational-fields",
      },
      {
        label: "Chương trình Đào Tạo",
        slug: "educational-programs",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div
      className={cn(
        "hidden fixed z-50 lg:block flex-col h-screen top-0 left-0 will-change-transform bottom-0 duration-300 border-r w-64 pb-10 px-8"
      )}
    >
      <div className="sticky top-0 z-10 pointer-events-none">
        <div className="h-8 bg-background"></div>
        <div className="flex items-center justify-center bg-background">
          <Link href="/" tabIndex={-1}>
            <img src="/logo.png" alt="logo" className="w-auto h-10" />
          </Link>
        </div>
        <div className="h-8 bg-gradient-to-b from-background"></div>
      </div>
      <nav className="relative lg:text-sm lg:leading-6">
        <ScrollArea className="[&>div>div]:!block">
          <ul className="mt-12 lg:mt-8">
            {Items.map(({ title, children }) => (
              <li key={title}>
                <h5 className="mb-8 font-semibold lg:mb-3 text-foreground">
                  {title}
                </h5>
                <ul className="space-y-6 border-l lg:space-y-2">
                  {children.map(({ slug, label }) => (
                    <li key={slug}>
                      <AdminNavLink slug={slug}>{label}</AdminNavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </nav>
    </div>
  );
};

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size={"icon"} className="lg:hidden">
            <AlignJustifyIcon size={18} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="relative lg:text-sm lg:leading-6">
            <ScrollArea className="[&>div>div]:!block">
              <ul className="mt-12 lg:mt-8">
                {Items.map(({ title, children }) => (
                  <li key={title}>
                    <h5 className="mb-8 font-semibold lg:mb-3 text-foreground">
                      {title}
                    </h5>
                    <ul className="space-y-6 border-l lg:space-y-2">
                      {children.map(({ slug, label }) => (
                        <li key={slug}>
                          <AdminNavLink slug={slug}>{label}</AdminNavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
