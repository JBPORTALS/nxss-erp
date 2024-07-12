import { cva, VariantProps } from "class-variance-authority";
import { Button } from "./button";

const navItemVariants = cva(

  "flex justify-start py-2 px-4 gap-2 w-full text-sm text-accent-foreground",

  {
    variants: {
      isActive: {
        true: "w-full justify-start rounded-e-none border-r-2 border-purple-600 bg-accent",
      },
    },
  },
);

export interface NavItemProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof navItemVariants> {}

export default function NavItem({
  className,
  children,
  isActive,
  ...props
}: NavItemProps) {
  return (
    <Button
    variant={"ghost"} className={navItemVariants({ className, isActive })} {...props}>
      {children}
    </Button>
  ); 
}
