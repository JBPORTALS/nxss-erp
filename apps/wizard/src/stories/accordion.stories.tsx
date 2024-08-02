import { Meta, StoryObj } from "@storybook/react";
import { PlusCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerText,
} from "@nxss/ui/accordion";
import { NavItem } from "@nxss/ui/nav-item";
import {
  NavigationMenu,
  NavigationMenuButton,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuText,
} from "@nxss/ui/navigation-menu";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => (
  <div className="w-56">
    <Accordion type="single" collapsible={false} className="w-full">
      <AccordionItem open={true} value={"item-1"} data-state={"open"}>
        <AccordionTrigger>
          <PlusCircle className="size-4 flex-shrink-0" />
          <AccordionTriggerText>Artificial Intelligence</AccordionTriggerText>
        </AccordionTrigger>
        <AccordionContent>
          <NavItem>Semester 1</NavItem>
          <NavItem>Semester 2</NavItem>
          <NavItem>Semester 3</NavItem>
          <NavItem>Semester 4</NavItem>
          <NavItem>Semester 5</NavItem>
          <NavItem>Semester 6</NavItem>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" open={true}>
        <AccordionTrigger>
          <PlusCircle className="size-4 flex-shrink-0" />
          <AccordionTriggerText>Computer Science</AccordionTriggerText>
        </AccordionTrigger>
        <AccordionContent>
          <NavItem>Semester 1</NavItem>
          <NavItem>Semester 2</NavItem>
          <NavItem>Semester 3</NavItem>
          <NavItem>Semester 4</NavItem>
          <NavItem>Semester 5</NavItem>
          <NavItem>Semester 6</NavItem>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" open={true}>
        <AccordionTrigger isActive={true}>
          <PlusCircle className="size-4 flex-shrink-0" />
          <AccordionTriggerText>Mechanical Engg.</AccordionTriggerText>
        </AccordionTrigger>
        <AccordionContent>
          <NavItem isActive>Semester 1</NavItem>
          <NavItem>Semester 2</NavItem>
          <NavItem>Semester 3</NavItem>
          <NavItem>Semester 4</NavItem>
          <NavItem>Semester 5</NavItem>
          <NavItem>Semester 6</NavItem>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
   
  </div>
);
