import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { withUt } from "uploadthing/tw";

import baseConfig from "@nxss/tailwind-config";

export default withUt({
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [
    ...baseConfig.content,
    "../../packages/ui/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-open-sans)", ...fontFamily.sans],
        mw: ["var(--font-Mw)"],
      },
    },
  },
});
