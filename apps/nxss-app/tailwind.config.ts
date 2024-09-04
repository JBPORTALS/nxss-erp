import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { withUt } from "uploadthing/tw";

import baseConfig from "@nxss/tailwind-config";

export default withUt({
  content: [
    ...baseConfig.content,
    "../../packages/ui/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mw: ["var(--font-Mw)"],
      },
    },
  },
});
