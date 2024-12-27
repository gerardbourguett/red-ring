import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";

const ModeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      isIconOnly
      variant="ghost"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="transition-all"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ModeToggle;
