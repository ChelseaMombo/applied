import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="outline" onClick={toggleTheme}>
      {theme === "dark" ? "Switch to light" : "Switch to dark"}
    </Button>
  );
}