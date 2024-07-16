import { Meta, StoryObj } from "@storybook/react";

import { ComboboxDemo } from "@nxss/ui/combobox";
import Landingpage from "@nxss/ui/landing-page";

const meta: Meta<typeof Landingpage> = {
  title: "UI/Landing-page",
  component: Landingpage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Landingpage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return <Landingpage />;
  },
};
