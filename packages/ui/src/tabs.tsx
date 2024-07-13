import { cn } from ".";
import { cva, VariantProps } from "class-variance-authority";



interface TabProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Tab = ({
  children,
  className,
  ...props
}: TabProps) => {
  return (
   
      {children}
  
  );
};



interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Tabs = ({
  children,
  className,
  ...props
}: TabsProps) => {
  return (
    <div
    className=
      "border-b-2 border-gray-100"
  >
    <div
      className={cn(
        "flex w-full gap-0 px-10 -mb-0.5 overflow-x-auto",
        className,
      )}
    >
      {children}
    </div>
    </div>
  );
};



const TabListVariants = cva(

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
  
  export interface TabListProps
    extends React.HTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof TabListVariants> {}
  
  export default function TabList({
    className,
    children,
    isActive,
    ...props
  }: TabListProps) {
    return (
      <button className={cn("",TabListVariants({ className, isActive }))} {...props}>
        {children}
      </button>
    ); 
  }
  
