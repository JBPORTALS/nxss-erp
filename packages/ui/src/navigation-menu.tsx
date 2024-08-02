import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from ".";

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
  "my-1 flex w-full flex-1 items-center gap-2 rounded rounded-e-none border-r border-transparent px-3 py-2.5 text-accent-foreground transition-all [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      open: {
        true: "w-full justify-start border-purple-600 bg-accent",
        false:
          "text-accent-foreground/80 hover:border-accent-foreground/50 hover:bg-muted hover:text-black",
      },
    },
    defaultVariants: {
      open: false,
    },
  },
);

interface NavigationMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navigationMenuButtonVariants> {}

const NavigationMenuButton = React.forwardRef<
  HTMLButtonElement,
  NavigationMenuButtonProps
>(({ className, children, open, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(navigationMenuButtonVariants({ open }), className)}
    data-state={open ? "open" : "closed"}
    {...props}
  >
    {children}
    <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200" />
  </button>
));
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
    <div ref={ref} className={cn("mt-2", className)} {...props}>
      {children}
    </div>
  ) : null,
);
NavigationMenuContent.displayName = "NavigationMenuContent";

// NavigationMenuItem
const NavigationMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className="ml-5 border-l pt-1 text-xs" {...props}>
    <div className={cn("ml-2 gap-0 pb-2 pt-0", className)}>{children}</div>
  </div>
));
NavigationMenuItem.displayName = "NavigationMenuItem";

export {
  NavigationMenu,
  NavigationMenuButton,
  NavigationMenuText,
  NavigationMenuContent,
  NavigationMenuItem,
};
