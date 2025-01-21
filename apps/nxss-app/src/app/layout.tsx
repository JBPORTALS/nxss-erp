import type { Metadata, Viewport } from "next";
import { Fira_Mono, Fira_Sans } from "next/font/google";

import { cn } from "@nxss/ui";
import { ThemeProvider } from "@nxss/ui/theme";

import { env } from "~/env";

import "~/app/globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "./api/uploadthing/core";
import { Providers } from "./providers";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex bg-background font-sans text-foreground antialiased",
          FiraSans.variable,
          FiraMono.variable,
        )}
      >
        <ThemeProvider enableSystem attribute="class" defaultTheme="light">
          <Providers>
            <NextSSRPlugin
              /**
               * The `extractRouterConfig` will extract **only** the route configs
               * from the router to prevent additional information from being
               * leaked to the client. The data passed to the client is the same
               * as if you were to fetch `/api/uploadthing` directly.
               */
              routerConfig={extractRouterConfig(ourFileRouter)}
            />
            {props.children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
