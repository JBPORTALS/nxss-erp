// stories/ComboboxDemo.stories.tsx

import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";
import userEvent from "@testing-library/user-event";

import { ComboboxDemo } from "@nxss/ui/combobox";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const meta: Meta<typeof ComboboxDemo> = {
  title: "UI/ComboboxDemo",
  component: ComboboxDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ComboboxDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { frameworks },
  render: () => <ComboboxDemo />,
};


