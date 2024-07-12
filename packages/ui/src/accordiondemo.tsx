import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "./accordion"
import { PlusCircle } from "lucide-react"
import NavItem from "./nav-item"
import { HStack } from "./stack"
  
  export function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger isActive><HStack><PlusCircle />Artificial Intelligence</HStack></AccordionTrigger>
          <AccordionContent>
            <NavItem>Semester 1</NavItem>
            <NavItem>Semester 2</NavItem>
            <NavItem>Semester 3</NavItem>
            <NavItem>Semester 4</NavItem>
            <NavItem>Semester 5</NavItem>
            <NavItem>Semester 6</NavItem>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger><HStack><PlusCircle />Computer Science</HStack></AccordionTrigger>
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
          <AccordionTrigger><HStack><PlusCircle />Mechanical Engg.</HStack></AccordionTrigger>
          <AccordionContent >
            <NavItem>Semester 1</NavItem>
            <NavItem>Semester 2</NavItem>
            <NavItem>Semester 3</NavItem>
            <NavItem>Semester 4</NavItem>
            <NavItem>Semester 5</NavItem>
            <NavItem>Semester 6</NavItem>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  