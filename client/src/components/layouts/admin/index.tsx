import Forbidden from "@/components/forbidden";
import MyMenu from "@/components/menu/my-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useMeQuery } from "@/generated/graphql";
import ActiveLink from "@/lib/active-link";
import { cn } from "@/lib/utils";
import {
  Braces,
  ChevronDown,
  Database,
  FolderEdit,
  HardDrive,
  LayoutDashboard,
  List,
  LucideIcon,
  Users2,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout: React.FC<Props> = ({ children, title = "HCMUE" }) => {
  const { data, loading } = useMeQuery();
  const [forbidden, setForbidden] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!data?.me) {
        router.push(
          {
            pathname: "/auth/login",
            query: { back: true },
          },
          "/auth/login"
        );
      } else if (data.me.role.id !== "R01") {
        setForbidden(true);
      }
    }
  }, [data, loading]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Sidebar />
      <div className="relative md:pl-64">
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 bg-white border-b h-14 dark:border-slate-300/10 backdrop-blur border-slate-900/10 bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
          {/* <div className="flex items-center">
            {!loading && data?.me?.role.id === "R01" ? (
              <MobileSidebar className="md:hidden" />
            ) : (
              <Skeleton className="h-9 w-9" />
            )}
          </div> */}
          <div></div>
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
                <>
                  <div className="flex flex-col">
                    <span className="text-right">{data.me.username}</span>
                    <span className="text-xs font-light text-right"></span>
                  </div>
                  <MyMenu me={data.me} />
                </>
              )}
            </div>
          </div>
        </header>
        <div className="min-h-[calc(100vh-96px)] p-4">
          {forbidden ? <Forbidden /> : children}
        </div>
        <footer className="px-6 py-2">
          <p> © HCMUE 2023 </p>
        </footer>
      </div>
    </>
  );
};

export default AdminLayout;

// const MobileSidebar: React.FC<{ className?: string }> = ({ className }) => {
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     function handleResize() {
//       if (window.innerWidth >= 768) {
//         setOpen(false);
//       }
//     }

//     window?.addEventListener("resize", handleResize);

//     handleResize();

//     return () => window?.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button variant="outline" size={"icon"} className={className}>
//           <List className="w-4 h-4" />
//         </Button>
//       </SheetTrigger>
//       <SheetContent side={"left"} className="max-w-full min-w-[20rem]">
//         <ScrollArea className="[&>div>div]:!block">
//           <ul className="pb-4 mt-2 space-y-6 overflow-hidden">
//             <li>
//               <div className="duration-300 ease-in-out">
//                 <span className="overflow-hidden font-light uppercase whitespace-nowrap text-ellipsis"></span>
//               </div>
//               <ul className="mt-2">
//                 {ITEMS.map(({ href, icon, label, items }) => (
//                   <li key={href}>
//                     {items ? (
//                       <NavItem
//                         href={href}
//                         icon={icon}
//                         label={label}
//                         items={items}
//                       />
//                     ) : (
//                       <NavLinkItem href={href} icon={icon} label={label} />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           </ul>
//         </ScrollArea>
//       </SheetContent>
//     </Sheet>
//   );
// };

// interface INavItem {

//   icon: LucideIcon;
//   label: React.ReactNode;
//   items: {
//     href: string;
//     label: React.ReactNode;
//   }[];
// }

// interface NavLinkItemProps {
//   href: string;
//   icon: LucideIcon;
//   label: React.ReactNode;
// }

// const NavLinkItem: React.FC<NavLinkItemProps> = ({
//   href,
//   icon: Icon,
//   label,
// }) => {
//   return (
//     <ActiveLink
//       href={href}
//       className="relative flex items-center justify-start px-4 py-3 overflow-hidden font-semibold rounded-md will-change-transform group outline-primary hover:text-primary"
//       activeClassName="text-primary"
//     >
//       <Icon
//         size={20}
//         className="flex-shrink-0 w-5 h-5 mr-3 duration-300 ease-in-out stroke-2 group-hover:translate-x-1"
//       />
//       <p className="overflow-hidden duration-300 ease-in-out text-ellipsis whitespace-nowrap group-hover:translate-x-1">
//         {label}
//       </p>
//     </ActiveLink>
//   );
// };

// interface NavItemProps {
//   href: string;
//   icon: LucideIcon;
//   label: React.ReactNode;
//   items: {
//     href: string;
//     label: React.ReactNode;
//   }[];
// }

// const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, items }) => {
//   const [open, setOpen] = useState(true);

//   return (
//     <>
//       <div
//         className={cn(
//           "relative flex items-center justify-start px-4 py-3 overflow-hidden font-semibold will-change-transform group outline-primary hover:text-primary cursor-pointer"
//         )}
//         onClick={() => setOpen((pre) => !pre)}
//       >
//         <Icon
//           size={20}
//           className="flex-shrink-0 w-5 h-5 mr-3 duration-300 ease-in-out stroke-2 group-hover:translate-x-1"
//         />
//         <p className="overflow-hidden duration-300 ease-in-out text-ellipsis whitespace-nowrap group-hover:1translate-x-">
//           {label}
//         </p>
//         <ChevronDown
//           size={16}
//           className={cn("ml-auto duration-300", open && "rotate-180")}
//         />
//       </div>
//       <ul
//         className={cn(
//           "ml-6 border-l transition-all duration-300 overflow-hidden"
//         )}
//         style={{
//           maxHeight: open ? `${items.length * 36}px` : "0px",
//         }}
//       >
//         {items.map((item) => (
//           <li key={item.href}>
//             <ActiveLink
//               href={item.href}
//               className="flex items-center py-1.5 pl-4 -ml-px font-semibold border-l group hover:text-primary hover:border-l-primary"
//               activeClassName="text-primary border-l-primary"
//             >
//               <p className="overflow-hidden duration-300 ease-in-out text-ellipsis whitespace-nowrap group-hover:translate-x-1">
//                 {item.label}
//               </p>
//             </ActiveLink>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };
