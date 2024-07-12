import { cn } from ".";
import { cva, VariantProps } from "class-variance-authority";

const branchNavItemVariants = cva(

  "flex items-center h-10 px-8 border-b-2 border-transparent gap-3 text-sm text-accent-foreground justify-center",

  {
    variants: {
      isActive: {
        true: "border-primary text-black",
        false: "hover:border-b-gray-300"
      },
    },
    defaultVariants:{
      isActive:false
    }
  },
);

export interface BranchNavItemProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof branchNavItemVariants> {}

export default function BranchNavItem({
  className,
  children,
  isActive,
  ...props
}: BranchNavItemProps) {
  return (
    <button className={cn("",branchNavItemVariants({ className, isActive }))} {...props}>
      {children}
    </button>
  ); 
}
