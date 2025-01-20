"use client";

import { Toaster } from "@nxss/ui/toast";
import { TooltipProvider } from "@nxss/ui/tooltip";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { BadgeAlert, BadgeCheck, BadgeInfo, TriangleAlert } from "lucide-react";
import { useTheme } from "next-themes";

export function Providers(props: { children: React.ReactNode }) {
  const { theme, systemTheme } = useTheme();
  return (
    <ClerkProvider
      afterSignOutUrl={"/sign-in"}
      appearance={{
        baseTheme:
          theme === "dark" || systemTheme === "dark" ? dark : undefined,
        elements: {
          card: "bg-background",
          logoImage: "dark:invert",
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
