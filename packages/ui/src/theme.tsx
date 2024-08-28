"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { LaptopMinimal } from "lucide-react";
import { ThemeProvider, useTheme } from "next-themes";

import { Button } from "./button";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex w-full items-center border-t px-4 pt-3">
      <Button
        variant={theme === "light" ? "primary" : "outline"}
        size="icon"
        onClick={() => setTheme("light")}
        className={`w-full rounded-e-none border-r-0 transition-transform duration-300`}
      >
        <SunIcon />
        <span className="sr-only">Light mode</span>
      </Button>
      <Button
        variant={theme === "dark" ? "primary" : "outline"}
        size="icon"
        onClick={() => setTheme("dark")}
        className={`w-full rounded-none transition-transform duration-300`}
      >
        <MoonIcon />
        <span className="sr-only">Dark mode</span>
      </Button>
      <Button
        variant={theme === "system" ? "primary" : "outline"}
        size="icon"
        onClick={() => setTheme("system")}
        className={`w-full rounded-s-none border-l-0 transition-transform duration-300`}
      >
        <LaptopMinimal />
        <span className="sr-only">System mode</span>
      </Button>
    </div>
  );
}

export { ThemeProvider, ThemeToggle, useTheme };
