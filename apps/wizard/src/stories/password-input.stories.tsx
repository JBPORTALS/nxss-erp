import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@nxss/ui/button";
import { PasswordInput } from "@nxss/ui/password-input";
import React from "react";

const meta: Meta<typeof PasswordInput> = {
  title: "UI/PasswordInput",
  component: PasswordInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Password: Story = {
  args: {},
  render: (args) => {
    return (
      <form>
        <PasswordInput placeholder="Password" required />
        <Button type="submit">Submit</Button>
      </form>
    );
  },
};