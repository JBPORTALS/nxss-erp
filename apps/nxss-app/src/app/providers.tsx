"use client";

import { useTheme } from "@nxss/ui/theme";
import { Toaster } from "@nxss/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { BadgeAlert, BadgeCheck, BadgeInfo, TriangleAlert } from "lucide-react";

export function Providers(props: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <ClerkProvider
      afterSignOutUrl={"/sign-in"}
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      <TRPCReactProvider>{props.children}</TRPCReactProvider>
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
