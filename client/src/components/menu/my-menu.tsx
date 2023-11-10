import {
  MeDocument,
  MeQuery,
  UserInfoFragment,
  useLogoutMutation,
} from "@/generated/graphql";
import { useAltKey } from "@/hooks/useKey";
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
import { useRouter } from "next/router";
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
import { deleteLocalStorageToken } from "@/services/auth.service";

interface Props {
  me?: UserInfoFragment | null;
  className?: string;
}

const MyMenu: React.FC<Props> = ({ me, className }) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [logout, { loading: logoutLoading, client }] = useLogoutMutation();

  const handleLogout = async () => {
    if (!me || logoutLoading) return;
    try {
      await logout({
        update: (_cache, { data }) => {
          if (data?.logout) {
            client.resetStore();
            deleteLocalStorageToken();
          }
        },
      });
    } catch (error) {}
  };

  useAltKey("q", handleLogout);
  useAltKey("l", () => router.push("/auth/login"));

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          <Contact className="w-4 h-4 transition-all scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end">
        {me ? (
          <>
            <DropdownMenuLabel>
              Tài khoản: {me.username} - {me.role.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                <span>Hồ sơ</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                <span>Cài đặt</span>
              </DropdownMenuItem>
              {me.role.id === "R01" ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href={"/admin"}>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      <span>Trang quản trị</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <FunctionSquare className="w-4 h-4 mr-2" />
                    <span>Chương trình đào tạo</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CalendarDays className="w-4 h-4 mr-2" />
                    <span>Thời khóa biểu - Lịch thi</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FilePieChart className="w-4 h-4 mr-2" />
                    <span>Điểm số</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span>Thanh toán học phí</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        ) : null}
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
          <DropdownMenuItem>
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>Đóng góp ý kiến</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {me ? (
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            <span>Đăng xuất</span>
            <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => {}} asChild>
            <Link href={"/auth/login"}>
              <LogIn className="w-4 h-4 mr-2" />
              <span>Đăng nhập</span>
              <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyMenu;
