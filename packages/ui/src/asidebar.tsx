"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

import { cn } from ".";
import { Button } from "./button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ children, className, ...props }: SidebarProps) {
  return (
    <aside
      className={cn(
        "sticky inset-0 flex h-screen w-60 shrink-0 flex-col gap-4 border-r p-4",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

interface SidebarLabelProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const SidebarLabel = ({
  children,
  className,
  ...props
}: SidebarLabelProps) => {
  return (
    <h2
      className={cn("text-xs font-medium text-muted-foreground", className)}
      {...props}
    >
      {children}
    </h2>
  );
};

interface SidebarBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarBody = ({
  children,
  className,
  ...props
}: SidebarBodyProps) => {
  return (
    <div
      className={cn("-mr-px flex h-fit flex-col gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface SidebarItemProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  isActive?: boolean;
}

export const SidebarItem = React.forwardRef<
  HTMLButtonElement,
  SidebarItemProps
>(({ children, className, isActive, ...props }, ref) => (
  <Button
    ref={ref}
    variant="ghost"
    className={cn(
      "w-full items-center justify-start gap-2 px-2",
      isActive && "bg-accent text-accent-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </Button>
));
SidebarItem.displayName = "SidebarItem";

interface SidebarItemWithSubmenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  label: string;
}

export const SidebarItemWithSubmenu = ({
  icon,
  label,
  children,
  className,
  ...props
}: SidebarItemWithSubmenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} {...props}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn("w-full justify-between font-normal", className)}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span>{label}</span>
          </div>
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen ? "rotate-90 transform" : "",
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="ml-6 mt-2 flex flex-col gap-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};
