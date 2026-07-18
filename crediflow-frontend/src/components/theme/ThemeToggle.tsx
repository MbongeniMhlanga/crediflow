import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../ui/button";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={toggleTheme}
      className="gap-2"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
};
