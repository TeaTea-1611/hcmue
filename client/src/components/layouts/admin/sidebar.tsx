import { ScrollArea } from "@/components/ui/scroll-area";
import ActiveLink from "@/lib/active-link";
import { cn } from "@/lib/utils";
import {
  Contact,
  FileCode2,
  GraduationCap,
  LucideIcon,
  Package,
  PencilRuler,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface SidebarItem {
  title: string;
  children: {
    icon: LucideIcon;
    label: string;
    href: string;
  }[];
}

const Items: SidebarItem[] = [
  {
    title: "Bảng dữ liệu",
    children: [
      {
        icon: GraduationCap,
        label: "Sinh Viên",
        href: "/admin/students",
      },
      {
        icon: PencilRuler,
        label: "Giảng Viên",
        href: "/admin/lecturers",
      },
      {
        icon: Contact,
        label: "Nhân Viên",
        href: "/admin/staffs",
      },
      {
        icon: FileCode2,
        label: "Học phần",
        href: "/admin/modules",
      },
      {
        icon: Package,
        label: "Lớp học phần",
        href: "/admin/module-classes",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <nav
      className={cn(
        "hidden fixed z-50 md:flex flex-col h-screen top-0 left-0 will-change-transform bottom-0 duration-300 border-r border-slate-900/10 dark:border-slate-300/10 w-64"
      )}
    >
      <div className="sticky top-0 z-10 pointer-events-none">
        <div className="h-8 bg-background"></div>
        <div className="flex items-center justify-center bg-background">
          <Link href={"/"} tabIndex={-1}>
            <img src="/logo.png" alt="logo" className="w-auto h-10" />
          </Link>
        </div>
        <div className="h-8 bg-gradient-to-b from-background"></div>
      </div>
      <ScrollArea className="[&>div>div]:!block">
        <ul className="mt-2">
          {Items.map(({ title, children }) => (
            <li key={title}>
              <div className="mt-6 mb-2 ml-4">
                <span className="text-sm uppercase text-accent-foreground">
                  {title}
                </span>
              </div>
              <ul className="mx-4">
                {children.map(({ icon: Icon, href, label }) => (
                  <li key={href}>
                    <ActiveLink
                      href={href}
                      className="duration-200 ease-in-out flex items-center px-3 py-2.5 rounded-md group"
                      activeClassName="bg-gradient-to-r from-primary to-primary/60 shadow-primary shadow-md text-white font-medium"
                    >
                      <Icon
                        size={18}
                        className="mr-3 duration-200 ease-in-out group-hover:translate-x-1"
                      />
                      <span className="duration-200 ease-in-out group-hover:translate-x-1">
                        {label}
                      </span>
                    </ActiveLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </nav>
  );
};

export default Sidebar;
