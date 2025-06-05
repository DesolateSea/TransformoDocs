import {
  Home,
  Rocket,
  Zap,
  LineChart,
  Settings,
  Wrench,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../Lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleSidebar } from "../../Store/sidebarSlice";
import { LogOut } from "lucide-react";
import { logout } from "../../Store/userSlice";
import AuthService from "../../services/API.Login";
const navigation = [
  { name: "Getting Started", href: "/app/", icon: Rocket },
  { name: "Dashboard", href: "/app/dashboard", icon: Home },
  { name: "Transformations", href: "/app/transformations", icon: Zap },
  { name: "Analytics", href: "/app/analytics", icon: LineChart },
  { name: "Settings", href: "/app/settings", icon: Settings },
  { name: "Developer Tools", href: "/app/developer", icon: Wrench },
];

// Define light and dark theme colors as constants
const lightTheme = {
  background: "#FFFFFF",
  border: "#E5E7EB", // gray-200
  text: "#374151", // gray-700
  textMuted: "#9CA3AF", // gray-400
  primary: "#3B82F6", // blue-500 (tailwind default primary)
  hoverBg: "#F3F4F6", // gray-100
  icon: "#9CA3AF", // gray-400
  iconHover: "#3B82F6",
  toggleBtnBgHover: "#F3F4F6",
  toggleBtnIcon: "#4B5563", // gray-600
};

const darkTheme = {
  background: "#111827", // gray-900
  border: "#1F2937", // gray-800
  text: "#D1D5DB", // gray-300
  textMuted: "#6B7280", // gray-400 dark variant
  primary: "#3B82F6", // same blue-500 for primary
  hoverBg: "#1F2937", // gray-800
  icon: "#6B7280", // gray-500
  iconHover: "#3B82F6",
  toggleBtnBgHover: "#1F2937",
  toggleBtnIcon: "#D1D5DB", // gray-300
};
const LogoutButton = () => {
  const dispatch = useDispatch();
  const API = new AuthService();
  const isCollapsed = useSelector(
    (state: RootState) => state.sidebar.isCollapsed
  );
  const UserLogout = async () => {
    await API.logout();
    dispatch(logout());
  };
  return (
    <button
      onClick={() => UserLogout()}
      className="p-2 rounded-lg hover:text-red-500"
      style={{
        backgroundColor: "transparent",
      }}
    >
      {isCollapsed ? (
        <LogOut className="h-5 w-5" aria-hidden="true" />
      ) : (
        <div className="flex items-center gap-x-2">
          <LogOut className="h-5 w-5" aria-hidden="true" />
          Logout
        </div>
      )}
    </button>
  );
};
export function DashboardSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isCollapsed = useSelector(
    (state: RootState) => state.sidebar.isCollapsed
  );
  const isDark = useSelector((state: RootState) => state.theme.isDarkMode);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <div
      className={cn(
        "fixed inset-y-0 z-50 flex flex-col transition-all duration-300 border-r",
        isCollapsed ? "w-16" : "w-72"
      )}
      style={{
        backgroundColor: theme.background,
        borderColor: theme.border,
      }}
    >
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-4 pb-4">
        <div className="flex h-16 shrink-0 items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-2xl font-bold" style={{ color: theme.primary }}>
              Transformodocs
            </h1>
          )}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg"
            style={{
              backgroundColor: "transparent",
            }}
          >
            {isCollapsed ? (
              <ChevronRight
                className="h-5 w-5"
                style={{ color: theme.toggleBtnIcon }}
              />
            ) : (
              <ChevronLeft
                className="h-5 w-5"
                style={{ color: theme.toggleBtnIcon }}
              />
            )}
          </button>
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors"
                        )}
                        style={{
                          backgroundColor: isActive
                            ? theme.hoverBg
                            : "transparent",
                          color: isActive ? theme.primary : theme.text,
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            (
                              e.currentTarget as HTMLAnchorElement
                            ).style.backgroundColor = theme.hoverBg;
                            (e.currentTarget as HTMLAnchorElement).style.color =
                              theme.primary;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            (
                              e.currentTarget as HTMLAnchorElement
                            ).style.backgroundColor = "transparent";
                            (e.currentTarget as HTMLAnchorElement).style.color =
                              theme.text;
                          }
                        }}
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0 transition-colors"
                          aria-hidden="true"
                          style={{
                            color: isActive ? theme.primary : theme.icon,
                            transition: "color 0.3s ease",
                          }}
                        />
                        {!isCollapsed && <span>{item.name}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
        <LogoutButton />
      </div>
    </div>
  );
}
