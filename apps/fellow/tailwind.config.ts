import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@nxss/tailwind-config/native";

export default {
  content: ["./app/**/*.{ts,tsx}", "./componenets/**/*.{ts,tsx}"],
  presets: [baseConfig, nativewind],
} satisfies Config;
