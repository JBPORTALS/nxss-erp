import { cva, VariantProps } from "class-variance-authority";

import { Button } from "./button";

const navItemVariants = cva(
  "flex w-full justify-start gap-2 px-4 py-2 text-sm font-normal text-accent-foreground",
  {
    variants: {
      isActive: {
        true: "justify-start bg-accent",
        false: "text-accent-foreground/60 hover:border-accent-foreground/50",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

export interface NavItemProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navItemVariants> {}

export function NavItem({
  className,
  children,
  isActive,
  ...props
}: NavItemProps) {
  return (
    <Button
      variant={"ghost"}
      className={navItemVariants({ className, isActive })}
      {...props}
    >
      {children}
    </Button>
  );
}
