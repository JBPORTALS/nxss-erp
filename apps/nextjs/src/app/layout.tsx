import type { Metadata, Viewport } from "next";
import { Merriweather, Open_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@nxss/ui";
import { ThemeProvider } from "@nxss/ui/theme";
import { Toaster } from "@nxss/ui/toast";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

const OpenSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});
const Mw = Merriweather({
  variable: "--font-Mw",
  subsets: ["latin"],
  weight: ["900"],
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
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
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
    <ClerkProvider afterSignOutUrl={"/sign-in"}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen w-full bg-background font-sans text-foreground antialiased",
            OpenSans.variable,
            Mw.variable,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TRPCReactProvider>{props.children}</TRPCReactProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
