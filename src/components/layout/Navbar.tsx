import { Link, useLocation } from "react-router-dom";
import { ChartBarIcon, ListTodo, Settings } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="border-b sticky top-0 bg-background z-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Multi Stock Management</h1>
          </div>
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <ListTodo className="h-5 w-5" />
              <span>등록현황</span>
            </Link>
            <Link
              to="/statistics"
              className={`flex items-center space-x-2 ${
                isActive('/statistics') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <ChartBarIcon className="h-5 w-5" />
              <span>통계</span>
            </Link>
            <Link
              to="/settings"
              className={`flex items-center space-x-2 ${
                isActive('/settings') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>설정</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;