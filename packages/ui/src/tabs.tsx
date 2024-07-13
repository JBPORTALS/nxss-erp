import { cva, VariantProps } from "class-variance-authority";

import { cn } from ".";

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Tabs = ({ children, className }: TabsProps) => {
  return (
    <div className="border-b-2 border-gray-100">
      <div
        className={cn(
          "-mb-0.5 flex w-full gap-0 overflow-x-auto px-10",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

const TabListVariants = cva(
  "flex h-10 items-center justify-center gap-3 border-b-2 border-transparent px-8 text-sm text-accent-foreground",

  {
    variants: {
      isActive: {
        true: "border-primary text-black",
        false: "hover:border-b-gray-300",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

export interface TabListProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof TabListVariants> {}

export function TabList({
  className,
  children,
  isActive,
  ...props
}: TabListProps) {
  return (
    <button
      className={cn("", TabListVariants({ className, isActive }))}
      {...props}
    >
      {children}
    </button>
  );
}
