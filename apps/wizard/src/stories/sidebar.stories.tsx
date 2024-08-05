import Link from "next/link";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Home, Plus, Users } from "lucide-react";
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
} from "@nxss/ui/asidebar";
import { Button } from "@nxss/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nxss/ui/dialog";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { ComboboxDemo } from "@nxss/ui/combobox";

const meta: Meta<typeof Sidebar> = {
  title: "UI/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Multiple: Story = {
  args: {},
  render: (args) => {
    return (
      <Sidebar className="w-60 border">
        <SidebarBody>
          <SidebarLabel>Subject</SidebarLabel>
          <ComboboxDemo />
          <SidebarItem>

          </SidebarItem>
        </SidebarBody>
      </Sidebar>
    );
  },
};
