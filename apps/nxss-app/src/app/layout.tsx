import type { Metadata, Viewport } from "next";
import { Merriweather, Roboto } from "next/font/google";

import { cn } from "@nxss/ui";
import { ThemeProvider } from "@nxss/ui/theme";

import { env } from "~/env";

import "~/app/globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { SyncActiveOrganization } from "~/utils/sync-active-organization";
import { ourFileRouter } from "./api/uploadthing/core";
import { Providers } from "./providers";

const OpenSans = Roboto({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["100", "400", "300", "500", "700", "900"],
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "light min-h-screen w-full bg-background font-sans text-foreground antialiased",
          OpenSans.variable,
          Mw.variable,
        )}
      >
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
        <Providers>{props.children}</Providers>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
