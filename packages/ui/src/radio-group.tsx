"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Check } from "lucide-react";

import { cn } from ".";
import { HStack } from "./stack";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2 w-full", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-5 w-5 items-center justify-center rounded-full border-2",
        "group-data-[state=checked]:border-black group-data-[state=checked]:bg-black",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="absolute flex items-center justify-center">
        <Check className="h-3 w-3 text-white" />
      </RadioGroupPrimitive.Indicator>
    </div>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

const RadioGroupContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "group flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4",
        "data-[state=checked]:border-black",
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupContainer.displayName = "RadioGroupContainer";

export { RadioGroup, RadioGroupItem, RadioGroupContainer };
