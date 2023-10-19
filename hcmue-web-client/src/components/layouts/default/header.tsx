import MyMenu from "@/components/menu/my-menu";
import { ModeToggle } from "@/components/providers/theme-provider";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useMeQuery } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NEWS = [
  {
    label: "Thông báo chung",
    pathname: "/news/notification",
  },
  {
    label: "Tiếp nhận thông tin SV",
    pathname: "/news",
  },
  {
    label: "Miễn học, miễn thi ngoại ngữ, tin học",
    pathname: "/news",
  },
  {
    label: "Rèn luyện, Thực tập SP",
    pathname: "/news",
  },
  {
    label: "Kì thi kết thúc học phần",
    pathname: "/news",
  },
  {
    label: "Thông báo về lịch thi",
    pathname: "/news",
  },
  {
    label: "Thông tin tốt nghiệp",
    pathname: "/news",
  },
  {
    label: "Khảo sát lấy ý kiến người học",
    pathname: "/news",
  },
  {
    label: "Quy chế, Quy định",
    pathname: "/news",
  },
  {
    label: "Đăng ký học phần",
    pathname: "/news",
  },
  {
    label: "Thông báo từ phòng Kế hoạch Tài chính",
    pathname: "/news",
  },
  {
    label: "Học bổng - Chính sách",
    pathname: "/news",
  },
  {
    label: "Miễn giảm học phí",
    pathname: "/news",
  },
];

const TrainingIndustry = [
  {
    label: "Chuyên đề - Hợp đồng",
    pathname: "/",
  },
  {
    label: "Đại học - Chính quy",
    pathname: "/",
  },
  {
    label: "Đại học - Vừa làm vừa học",
    pathname: "/",
  },
  {
    label:
      "Đại học - Liên thông trình độ đại học đối với người đã có một bằng đại học",
    pathname: "/",
  },
  {
    label: "Đại học - Liên thông từ trung cấp lên đại học",
    pathname: "/",
  },
  {
    label: "Đại học - Liên thông từ cao đẳng lên đại học",
    pathname: "/",
  },
  {
    label: "Đại học - Tại chức Nghiệp vụ sư phạm - Hợp đồng",
    pathname: "/",
  },
];

const Header: React.FC = () => {
  const { data: meData, loading: meDataLoading } = useMeQuery();
  const [transparentHeader, setTransparentHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window?.scrollY >= 264) {
        setTransparentHeader(false);
      } else {
        setTransparentHeader(true);
      }
    };

    window?.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        id="header"
        className={cn(
          `fixed top-0 left-0 right-0 z-50 flex items-center duration-200 px-3 md:px-8 h-14 ${
            transparentHeader
              ? "bg-transparent bg-gradient-to-b from-black/80"
              : "bg-background border-b"
          }`
        )}
      >
        <div className="flex items-center">
          <Link href="/" legacyBehavior tabIndex={-1}>
            <a className="items-center justify-center hidden mr-6 text-lg md:flex">
              <img
                src={transparentHeader ? "/logo-white.png" : "/logo-color.png"}
                alt="logo"
                className="w-auto h-7"
              />
            </a>
          </Link>
          <NavigationMenu delayDuration={0}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`font-semibold ${
                    transparentHeader
                      ? "!text-slate-100 hover:!text-white [&_span]:bg-white"
                      : "[&_span]:bg-primary"
                  }`}
                >
                  Tin tức
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-1">
                    {NEWS.map((item) => (
                      <li key={item.pathname}>
                        <Link href={{ pathname: item.pathname }} legacyBehavior>
                          <a className="relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap">
                            {item.label}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`font-semibold ${
                    transparentHeader
                      ? "!text-slate-100 hover:!text-white [&_span]:bg-white"
                      : "[&_span]:bg-primary"
                  }`}
                >
                  Ngành đào tạo
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-1">
                    {TrainingIndustry.map((item) => (
                      <li key={item.pathname}>
                        <Link href={{ pathname: item.pathname }} legacyBehavior>
                          <a className="relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap">
                            {item.label}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`font-semibold ${
                    transparentHeader
                      ? "!text-slate-100 hover:!text-white [&_span]:bg-white"
                      : "[&_span]:bg-primary"
                  }`}
                >
                  Bộ môn
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-1">
                    {TrainingIndustry.map((item) => (
                      <li key={item.pathname}>
                        <Link href={{ pathname: item.pathname }} legacyBehavior>
                          <a className="relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap">
                            {item.label}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`font-semibold ${
                    transparentHeader
                      ? "!text-slate-100 hover:!text-white [&_span]:bg-white"
                      : "[&_span]:bg-primary"
                  }`}
                >
                  Văn bản
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-1">
                    {TrainingIndustry.map((item) => (
                      <li key={item.pathname}>
                        <Link href={{ pathname: item.pathname }} legacyBehavior>
                          <a className="relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap">
                            {item.label}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`font-semibold ${
                    transparentHeader
                      ? "!text-slate-100 hover:!text-white [&_span]:bg-white"
                      : "[&_span]:bg-primary"
                  }`}
                >
                  Hướng dẫn
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-1">
                    {TrainingIndustry.map((item) => (
                      <li key={item.pathname}>
                        <Link href={{ pathname: item.pathname }} legacyBehavior>
                          <a className="relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground whitespace-nowrap">
                            {item.label}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center justify-center flex-1 mx-4"></div>
        <div className="flex items-center">
          <ul className="flex [&>li]:h-10">
            <li className="hidden md:inline-flex">
              <Link href={"/auth/login"} legacyBehavior>
                <a
                  className={`group relative inline-flex items-center text-sm font-semibold ${
                    transparentHeader
                      ? "text-slate-100 hover:text-white [&_span]:bg-white"
                      : "hover:text-primary [&_span]:bg-primary"
                  }`}
                >
                  Đăng nhập
                  <span className="hidden absolute bottom-0.5 w-4 h-1 -translate-x-1/2 rounded-sm left-1/2 duration-200 group-hover:block"></span>
                </a>
              </Link>
            </li>
            <li className="hidden ml-4 md:inline-flex">
              <Link href={"/auth/login"} legacyBehavior>
                <a
                  className={`group relative inline-flex items-center text-sm font-semibold ${
                    transparentHeader
                      ? "text-slate-100 hover:text-white [&_span]:bg-white"
                      : "hover:text-primary [&_span]:bg-primary"
                  }`}
                >
                  Đăng ký học phần
                  <span className="hidden absolute bottom-0.5 w-4 h-1 -translate-x-1/2 rounded-sm left-1/2 duration-200 group-hover:block"></span>
                </a>
              </Link>
            </li>
            <li className="inline-flex ml-4">
              <MyMenu
                me={meData?.me}
                className={
                  transparentHeader
                    ? "bg-transparent hover:bg-transparent text-slate-100 hover:text-white border-black/10"
                    : ""
                }
              />
            </li>
          </ul>
        </div>
      </header>
      <div
        className={
          transparentHeader
            ? "fixed top-0 overflow-hidden -z-10 w-full"
            : "hidden"
        }
      >
        <div className="relative w-full h-80">
          <img
            src="/bg-cover.png"
            alt="bg-cover"
            className="object-cover object-center w-full h-full align-bottom"
          />
          <div className="absolute bottom-0 z-10 w-full h-20 bg-gradient-to-t from-black/80"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
