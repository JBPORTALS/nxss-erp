import type { Preview } from "@storybook/react";
import '../src/app/globals.css';
import { Open_Sans } from "next/font/google";
import React from "react"

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
  decorators:[
    (Story)=>(
      <main className={`${OpenSans.variable}`}><Story/></main>
    )
  ]
};

export default preview;
