import type { Preview } from "@storybook/react";

import "../src/app/globals.css";

import React from "react";
import { Open_Sans } from "next/font/google";

import { ThemeProvider } from "@nxss/ui/theme";

const OpenSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <main className={`${OpenSans.variable}`}>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </main>
    ),
  ],
};

export default preview;
