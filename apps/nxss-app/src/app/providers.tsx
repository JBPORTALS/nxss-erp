"use client";

import { Toaster } from "@nxss/ui/toast";
import { TooltipProvider } from "@nxss/ui/tooltip";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { BadgeAlert, BadgeCheck, BadgeInfo, TriangleAlert } from "lucide-react";
import { useTheme } from "next-themes";

import { buttonVariants } from "@nxss/ui/button";

export function Providers(props: { children: React.ReactNode }) {
  const { theme, systemTheme } = useTheme();

  function getTheme() {
    if (theme === "system") {
      if (systemTheme && systemTheme === "dark") return dark;
      else undefined;
    } else if (theme === "dark") return dark;
    else undefined;
  }

  return (
    <ClerkProvider
      afterSignOutUrl={"/sign-in"}
      appearance={{
        baseTheme: getTheme(),
        elements: {
          card: "bg-background font-sans rounded-none",
          logoImage: "dark:invert",
          formButtonPrimary: buttonVariants(),
          footer: "[&_>*]:bg-background",
          footerAction: "bg-background px-0 w-full justify-center",
          socialButtonsBlockButton: buttonVariants({ variant: "outline" }),
          alternativeMethodsBlockButton: buttonVariants({ variant: "outline" }),
          input:
            "flex h-9 w-full rounded-md border border-border bg-input px-3 py-2 text-sm transition-all duration-200 placeholder:text-muted-foreground focus:outline-none focus:outline-ring/20 focus:ring-4 focus:ring-ring/10 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
        },
      }}
    >
      <TRPCReactProvider>
        <TooltipProvider>{props.children}</TooltipProvider>
      </TRPCReactProvider>
      <Toaster
        richColors
        icons={{
          success: <BadgeCheck />,
          error: <BadgeAlert />,
          info: <BadgeInfo />,
          warning: <TriangleAlert />,
        }}
      />
    </ClerkProvider>
  );
}
