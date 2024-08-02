"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cva, VariantProps } from "class-variance-authority";
import { ChevronDown, PlusCircle } from "lucide-react";

import { cn } from ".";

const AccordionContext = React.createContext<{
  value: string | undefined;
  setValue: (value: string | undefined) => void;
}>({
  value: "",
  setValue: (value: string | undefined) => {},
});

const AccordionRoot = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => {
  const AccordionCtx = React.useContext(AccordionContext);

  return (
    <AccordionPrimitive.Root
      {...props}
      type="single"
      collapsible
      defaultValue={AccordionCtx.value}
      onValueChange={() => {}}
      value={AccordionCtx.value}
      ref={ref}
    />
  );
});

AccordionRoot.displayName = "AccordionRoot";

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [value, onChangeValue] = React.useState<string | undefined>("");

  const setValue = React.useCallback((value: string | undefined) => {
    onChangeValue(value);
  }, []);

  return (
    <AccordionContext.Provider value={{ setValue, value }}>
      <AccordionRoot ref={ref} {...props} />
    </AccordionContext.Provider>
  );
});

Accordion.displayName = "Accordion";

interface CustomAccordionItemProps {
  open?: boolean;
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> &
    CustomAccordionItemProps
>(({ className, open = false, value, ...props }, ref) => {
  const AccordionCtx = React.useContext(AccordionContext);
  React.useEffect(() => {
    if (open) AccordionCtx.setValue(value);
  }, [open]);

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("", className)}
      value={value}
      {...props}
    />
  );
});
AccordionItem.displayName = "AccordionItem";

const accordionTriggerVariants = cva(
  "my-1 flex w-full flex-1 items-center gap-2 rounded rounded-e-none border-r border-transparent px-3 py-2.5 text-accent-foreground transition-all [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      isActive: {
        true: "w-full justify-start border-purple-600 bg-accent",
        false:
          "text-accent-foreground/80 hover:border-accent-foreground/50 hover:bg-muted hover:text-black",
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
      data-state="closed"
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
    data-state="closed"
    ref={ref}
    className="ml-5 border-l pt-1 text-xs"
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
