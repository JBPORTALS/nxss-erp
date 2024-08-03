import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { PlusCircle } from "lucide-react";

import { NavItem } from "@nxss/ui/nav-item";
import {
  NavigationMenu,
  NavigationMenuButton,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuText,
} from "@nxss/ui/navigation-menu";

const meta: Meta<typeof NavigationMenu> = {
  title: "UI/Navigation Menu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => (
  <NavigationMenu>
    <NavigationMenuButton>
      <PlusCircle className="size-4 flex-shrink-0" />
      <NavigationMenuText>Computer science and Engg</NavigationMenuText>
    </NavigationMenuButton>
    <NavigationMenuContent>
      <NavigationMenuItem>
        <NavItem isActive>Semester 1</NavItem>
        <NavItem>Semester 2</NavItem>
        <NavItem>Semester 3</NavItem>
        <NavItem>Semester 4</NavItem>
        <NavItem>Semester 5</NavItem>
        <NavItem>Semester 6</NavItem>
      </NavigationMenuItem>
    </NavigationMenuContent>
  </NavigationMenu>
);
