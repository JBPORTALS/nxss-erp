import { Meta, StoryObj } from "@storybook/react";

import { Button } from "@nxss/ui/button";
import { Input } from "@nxss/ui/input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return <Input type="email" placeholder="Email" />;
  },
};

export const Password: Story = {
  args: {},
  render: (args) => {
    return (
      <form>
        <Input type="password" placeholder="Password" required />
        <Button>submit</Button>
      </form>
    );
  },
};
