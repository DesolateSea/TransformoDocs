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

const navigation = [
  { name: "Getting Started", href: "/", icon: Rocket },
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Transformations", href: "/transformations", icon: Zap },
  { name: "Analytics", href: "/analytics", icon: LineChart },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Developer Tools", href: "/developer", icon: Wrench },
];

export function DashboardSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isCollapsed = useSelector(
    (state: RootState) => state.sidebar.isCollapsed
  );

  return (
    <div
      className={cn(
        "fixed inset-y-0 z-50 flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-72"
      )}
    >
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-2xl font-bold text-primary">Transformodocs</h1>
          )}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        item.href === location.pathname
                          ? "bg-gray-50 dark:bg-gray-800 text-primary"
                          : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <item.icon
                        className={cn(
                          item.href === location.pathname
                            ? "text-primary"
                            : "text-gray-400 group-hover:text-primary",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {!isCollapsed && item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
