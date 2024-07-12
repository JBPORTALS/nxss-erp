import React from 'react';
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import BranchNavItem from '@nxss/ui/branch-navitem';
const meta = {
  title: "UI/BranchNavItem",
  component: BranchNavItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof BranchNavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Branch Nav Item',
  },
};

export const Active: Story = {
  args: {
    children: 'Active Item',
    isActive: true,
  },
};

export const Inactive: Story = {
  args: {
    children: 'Inactive Item',
    isActive: false,
  },
};