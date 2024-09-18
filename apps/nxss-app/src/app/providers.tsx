"use client";

import { useTheme } from "@nxss/ui/theme";
import { Toaster } from "@nxss/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { BadgeAlert, BadgeCheck, BadgeInfo, TriangleAlert } from "lucide-react";

import { buttonVariants } from "@nxss/ui/button";

import { SyncActiveOrganization } from "~/utils/sync-active-organization";

export function Providers(props: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <ClerkProvider
      afterSignOutUrl={"/sign-in"}
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          logoPlacement: "none",
          socialButtonsVariant: "blockButton",
          showOptionalFields: false,
        },
        elements: {
          cardBox: "shadow-none",
          footer: "hidden",
          headerTitle: "text-2xl",
          buttonArrowIcon: "hidden",
          formButtonPrimary: buttonVariants({ size: "sm" }),
        },
      }}
    >
      <SyncActiveOrganization />

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
