import Link from "next/link";
import { usePathname } from "next/navigation";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Home, Plus, Users } from "lucide-react";

import { AccordionDemo } from "@nxss/ui/accordiondemo";
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
          <SidebarLabel>MAIN MENU</SidebarLabel>
          <Link href={"/"} className="w-full">
            <SidebarItem>
              <Home className="size-4" /> Dashboard
            </SidebarItem>
          </Link>
          <Link href={"/faculty"} className="w-full">
            <SidebarItem isActive>
              <Users className="size-4" />
              Faculty
            </SidebarItem>
          </Link>
          <SidebarLabel className="pr-2">
            <div className="flex justify-between">
              BRANCHES
              <Dialog>
                <DialogTrigger asChild>
                  <Plus className="pb-1 hover:cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Branch</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Branch Name
                      </Label>
                      <Input
                        id="name"
                        defaultValue="Computer Science"
                        className="w-2/3"
                      />
                    </div>
                    <div className="flex w-full items-center gap-8">
                      <Label htmlFor="semester" className="text-right">
                        Number of Semester
                      </Label>
                      <select
                        id="semester"
                        defaultValue="1" // Set the default selected option here
                        className="w-20 bg-secondary/0"
                      >
                        {/* Option for each semester number */}
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </SidebarLabel>
          <AccordionDemo />
        </SidebarBody>
      </Sidebar>
    );
  },
};
