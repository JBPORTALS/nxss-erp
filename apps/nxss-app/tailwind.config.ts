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
        sans: ["var(--font-fira-sans)", ...fontFamily.sans],
        mono: ["var(--font-fira-mono)", ...fontFamily.mono],
      },
      colors: {
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "random-width": {
          "0%, 40%, 100%": { width: "100%" },
          "20%, 60%": { width: "60%" },
          "30%, 50%, 70%": { width: "50%" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "random-width": "random-width 4s ease-out infinite",
      },
    },
  },
});
