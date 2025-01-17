import * as React from "react";

import { cn } from ".";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-border bg-input px-3 py-2 text-sm transition-all duration-200 placeholder:text-muted-foreground focus:outline-none focus:outline-ring/20 focus:ring-4 focus:ring-ring/10 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
