import { PlusCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerText,
} from "./accordion";
import { NavItem } from "./nav-item";
import { HStack } from "./stack";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible={false} className="w-full">
      <AccordionItem value="item-1 ">
        <AccordionTrigger>
          <PlusCircle className="size-4 flex-shrink-0" />
          <AccordionTriggerText>Artificial Intelligence</AccordionTriggerText>
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
      <AccordionItem value="item-2">
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
      <AccordionItem value="item-3">
        <AccordionTrigger>
          
            <PlusCircle className="size-4 flex-shrink-0" />
            <AccordionTriggerText>Mechanical Engg.</AccordionTriggerText>
         
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
    </Accordion>
  );
}
