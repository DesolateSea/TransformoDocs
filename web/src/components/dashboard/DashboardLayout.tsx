import { DashboardSidebar } from "./DashboardSidebar";
import { ThemeToggle } from "../ThemeToggle";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isCollapsed = useSelector(
    (state: RootState) => state.sidebar.isCollapsed
  );

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main
        className={`transition-all duration-300 ${
          isCollapsed ? "lg:pl-16" : "lg:pl-72"
        }`}
      >
        <div className="flex justify-end p-4">
          <ThemeToggle />
        </div>
        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
