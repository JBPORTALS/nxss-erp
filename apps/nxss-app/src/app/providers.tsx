"use client";

import { Toaster } from "@nxss/ui/toast";
import { TooltipProvider } from "@nxss/ui/tooltip";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { BadgeAlert, BadgeCheck, BadgeInfo, TriangleAlert } from "lucide-react";

import { buttonVariants } from "@nxss/ui/button";

export function Providers(props: { children: React.ReactNode }) {
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
