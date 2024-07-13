"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cva, VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from ".";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const accordionTriggerVariants = cva(
  "flex w-full flex-1 items-center gap-2 px-3 py-4 transition-all [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      isActive: {
        true: "w-full rounded rounded-e-none border-r border-purple-600 bg-accent py-2",
        false: "",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof accordionTriggerVariants> {}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, isActive, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "w-full",
        accordionTriggerVariants({ isActive }),
        className,
      )}
      {...props}
    >
      {children}
      <div className="ml-auto flex w-fit justify-end">
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="ml-5 border-l text-xs"
    {...props}
  >
    <div className={cn("ml-2 gap-0 pb-2 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

interface AccordionTriggerTextProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionTriggerText = ({
  children,
  className,
}: AccordionTriggerTextProps) => {
  return <div className={cn("truncate text-sm", className)}>{children}</div>;
};

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionTriggerText,
};
