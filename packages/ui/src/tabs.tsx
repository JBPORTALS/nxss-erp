import { cva, VariantProps } from "class-variance-authority";

import { cn } from ".";

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Tabs = ({ children, className, ...props }: TabsProps) => {
  return (
    <div className="w-full border-b border-border">
      <div
        className={cn("-mb-px flex w-full gap-0 overflow-x-auto", className)}
      >
        {children}
      </div>
    </div>
  );
};

const TabItemVariants = cva(
  "flex h-10 items-center justify-center gap-3 border-b border-transparent px-8 text-sm text-accent-foreground",

  {
    variants: {
      isActive: {
        true: "border-purple-600 text-primary",
        false: "text-accent-foreground/80 hover:border-b-muted-foreground/60",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

export interface TabItemProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof TabItemVariants> {}

export function TabItem({
  className,
  children,
  isActive,
  ...props
}: TabItemProps) {
  return (
    <button
      className={cn("", TabItemVariants({ className, isActive }))}
      {...props}
    >
      {children}
    </button>
  );
}
