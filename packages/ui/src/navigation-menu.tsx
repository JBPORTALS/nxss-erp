import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot, SlotProps } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { ChevronDown, DotIcon } from "lucide-react";

import { cn } from ".";
import { NavItem, NavItemProps } from "./nav-item";

// NavigationMenu
interface NavigationMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
}

const NavigationMenu = React.forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ className, children, open, ...props }, ref) => (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { open } as Partial<NavigationMenuProps>)
          : child,
      )}
    </div>
  ),
);
NavigationMenu.displayName = "NavigationMenu";

// NavigationMenuButton
const navigationMenuButtonVariants = cva(
  "my-1 flex w-full flex-1 items-center justify-start gap-2 rounded rounded-e-none border-r border-transparent px-4 py-2.5 text-sm font-normal text-accent-foreground transition-all [&[data-state=open]>.chevron]:rotate-180",
  {
    variants: {
      open: {
        true: "justify-start rounded rounded-e-none border-purple-600 bg-accent",
        false:
          "text-accent-foreground/60 hover:border-accent-foreground/50 hover:bg-accent hover:text-foreground",
      },
    },
    defaultVariants: {
      open: false,
    },
  },
);

interface NavigationMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navigationMenuButtonVariants> {
  asChild?: boolean;
}

const NavigationMenuButton = React.forwardRef<
  HTMLButtonElement,
  NavigationMenuButtonProps
>(({ className, children, open, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(navigationMenuButtonVariants({ open }), className)}
      data-state={open ? "open" : "closed"}
      {...props}
    >
      {children}
      <ChevronDown className="chevron ml-auto h-4 w-4 shrink-0 transition-transform duration-200" />
    </button>
  );
});
NavigationMenuButton.displayName = "NavigationMenuButton";

// NavigationMenuText
const NavigationMenuText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("truncate", className)} {...props} />
));
NavigationMenuText.displayName = "NavigationMenuText";

// NavigationMenuContent
interface NavigationMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
}

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  NavigationMenuContentProps
>(({ className, open, children, ...props }, ref) =>
  open ? (
    <div
      ref={ref}
      className={cn("ml-5 mt-2 flex flex-col gap-2 border-l pl-2", className)}
      {...props}
    >
      {children}
    </div>
  ) : null,
);
NavigationMenuContent.displayName = "NavigationMenuContent";

// NavigationMenuItem

interface NavigationMenuItemProps extends NavItemProps {}

const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof NavItem>,
  NavigationMenuItemProps
>(({ className, children, ...props }, ref) => {
  return (
    <NavItem className={`text-sm ${className}`} {...props}>
      {children}
    </NavItem>
  );
});

NavigationMenuItem.displayName = "NavigationMenuItem";
export {
  NavigationMenu,
  NavigationMenuButton,
  NavigationMenuText,
  NavigationMenuContent,
  NavigationMenuItem,
};
