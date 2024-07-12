import { cn } from ".";

interface VStackProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const VStack= ({
  children,
  className,
  ...props
}: VStackProps) => {
  return (
    <div
      className={cn("flex flex-col gap-3 items-start", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface HstackProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const HStack = ({
  children,
  className,
  ...props
}: HstackProps) => {
  return (
    <div
      className={cn("flex gap-3 items-start", className)}
      {...props}
    >
      {children}
    </div>
  );
};
