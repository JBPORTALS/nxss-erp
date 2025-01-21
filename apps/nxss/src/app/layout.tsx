import type { Metadata, Viewport } from "next";
import { Fira_Mono, Fira_Sans } from "next/font/google";
import { env } from "@/env";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@nxss/ui";
import { ThemeProvider } from "@nxss/ui/theme";
import { Toaster } from "@nxss/ui/toast";

import "@/app/globals.css";

import { BadgeAlert, BadgeCheck, BadgeInfo, TriangleAlert } from "lucide-react";

const FiraSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const FiraMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "NexussERP",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "NexussERP",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "NexussERP",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "dark min-h-screen w-full bg-background font-sans text-foreground antialiased",
            FiraSans.variable,
            FiraSans.variable,
          )}
        >
          {/* <ThemeProvider attribute="class"> */}
          {props.children}
          <Toaster
            richColors
            icons={{
              success: <BadgeCheck />,
              error: <BadgeAlert />,
              info: <BadgeInfo />,
              warning: <TriangleAlert />,
            }}
          />
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
