import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { fn, within } from "@storybook/test";
import userEvent from "@testing-library/user-event";

import { Button } from "@nxss/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Controls the disabled state of the button",
    },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "destructive",
        "ghost",
        "link",
        "outline",
      ],
      description: "The visual style of the button",
    },
  },
  args: {
    onClick: fn(),
    disabled: false, // default value
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary",
  },
};

Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const primaryButton = await canvas.getByRole("button", { name: /Primary/i });

  await expect(primaryButton.innerHTML).toBe("Primary");
  await expect(primaryButton).toHaveStyle("background-color: #18181b");

  await userEvent.click(primaryButton);
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

Secondary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const SecondaryButton = await canvas.getByRole("button", {
    name: /Secondary/i,
  });

  await expect(SecondaryButton.innerHTML).toBe("Secondary");
  await expect(SecondaryButton).toHaveStyle("background-color: 	#f4f4f5");
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

Destructive.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const DestructiveButton = await canvas.getByRole("button", {
    name: /Destructive/i,
  });

  await expect(DestructiveButton.innerHTML).toBe("Destructive");
  await expect(DestructiveButton).toHaveStyle("background-color: 	#ef4444");
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

Ghost.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const GhostButton = await canvas.getByRole("button", { name: /Ghost/i });

  await expect(GhostButton.innerHTML).toBe("Ghost");
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
};

Link.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const LinkButton = await canvas.getByRole("button", { name: /Link/i });

  await expect(LinkButton.innerHTML).toBe("Link");
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

Outline.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const OutlineButton = await canvas.getByRole("button", { name: /Outline/i });

  await expect(OutlineButton.innerHTML).toBe("Outline");
  await expect(OutlineButton).toHaveStyle("background-color: #FFFFFF");
};
