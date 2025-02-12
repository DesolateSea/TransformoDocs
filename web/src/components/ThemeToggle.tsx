import { Moon, Sun } from "lucide-react";
import { Button } from "./Ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Store/themeSlice";
import { RootState } from "../store";
import { useEffect } from "react";

export function ThemeToggle() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch(toggleTheme())}
      className="h-9 w-9"
    >
      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
