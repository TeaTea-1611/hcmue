"use client";
import {
  MeDocument,
  MeQuery,
  UserFragment,
  useLogoutMutation,
} from "@/__generated__/gql";
import {
  CalendarDays,
  Contact,
  CreditCard,
  FilePieChart,
  FunctionSquare,
  LayoutDashboard,
  LogIn,
  LogOut,
  MessageSquare,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
  me: UserFragment;
  className?: string;
}

const MyMenu: React.FC<Props> = ({ me, className }) => {
  const { theme, setTheme } = useTheme();
  const [logout, { loading: logoutLoading, client }] = useLogoutMutation();

  const handleLogout = async () => {
    if (!me || logoutLoading) return;
    try {
      await logout({
        update: (_cache, { data }) => {
          if (data?.logout) {
            client.resetStore();
          }
        },
      });
    } catch (error) {}
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          <Contact className="w-4 h-4 transition-all scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end">
        <DropdownMenuLabel>
          Tài khoản: {me.username} - {me.role}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            <span>Cài đặt</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Sun className="w-4 h-4 mr-2 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute w-4 h-4 mr-2 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
              <span>Chủ đề</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem
                  checked={theme === "light"}
                  onCheckedChange={() => {
                    setTheme("light");
                  }}
                  className="cursor-pointer"
                >
                  Sáng
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "dark"}
                  onCheckedChange={() => {
                    setTheme("dark");
                  }}
                  className="cursor-pointer"
                >
                  Tối
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "system"}
                  onCheckedChange={() => {
                    setTheme("system");
                  }}
                  className="cursor-pointer"
                >
                  Hệ thống
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyMenu;
