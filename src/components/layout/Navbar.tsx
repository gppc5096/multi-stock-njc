import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BarChart2, Settings as SettingsIcon, LogOut } from "lucide-react";
import { logout, isAuthenticated } from "@/lib/security/passwordManager";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "등록 현황",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "통계",
    href: "/statistics",
    icon: BarChart2,
  },
  {
    title: "설정",
    href: "/settings",
    icon: SettingsIcon,
  },
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logout();
    window.dispatchEvent(new Event('logout'));
    navigate('/landing');
  };

  return (
    <nav className="bg-[#2c46f2] border-b">
      <div className="container flex h-14 items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Multi Stock Management</h1>
        <div className="flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 text-xl transition-colors text-white/80 hover:text-white",
                  location.pathname === item.href && "text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
          {authenticated && (
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-xl text-white/80 hover:text-white hover:bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              종료
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};