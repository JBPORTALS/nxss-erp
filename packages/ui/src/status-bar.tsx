"use client";

import React, { useEffect, useRef, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from ".";
import { Check, Circle } from "lucide-react";

const AddStatusVariants = cva("h-6 w-6 rounded-full border-2 bg-white", {
  variants: {
    variant: {
      success: "border-green-500",
      pending: "border-gray-200",
      process: "border-black",
    },
  },
  defaultVariants: {
    variant: "pending",
  },
});

type VariantKeys = VariantProps<typeof AddStatusVariants>["variant"];

interface AddStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantKeys;
}

export function StatusBar({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [lineHeight, setLineHeight] = useState<number>(0);
  const statusBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statusBarRef.current) {
      const firstCircle = statusBarRef.current.querySelector('.add-status:first-child svg');
      const lastCircle = statusBarRef.current.querySelector('.add-status:last-child svg');
      
      if (firstCircle && lastCircle) {
        const firstCircleTop = firstCircle.getBoundingClientRect().top;
        const lastCircleBottom = lastCircle.getBoundingClientRect().bottom;
        const newHeight = lastCircleBottom - firstCircleTop;
        setLineHeight(newHeight);
      }
    }
  }, [children]);

  return (
    <div ref={statusBarRef} className={cn("relative ml-6", className)} {...props}>
      <ul className="list-none space-y-6">{children}</ul>
      <div
        className="absolute left-[12px] top-0 w-[1.5px] bg-muted-foreground"
        style={{ height: `${lineHeight}px` }}
      />
    </div>
  );
}

export const AddStatus = ({
  children,
  className,
  variant,
  ...props
}: AddStatusProps) => {
  return (
    <li className="flex items-start space-x-2  mb-16 add-status">
      <svg
        className={cn(
          "z-20 h-10 w-10 flex-shrink-0",
          AddStatusVariants({ variant }),
          className,
        )}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        {variant === 'success' && (
          <Check size={20} className="text-green-400"/>
        )}
      </svg>
      <div className="flex-grow">
        <div className={cn("flex w-full flex-col ml-10 gap-5", className)} {...props}>
          {children}
        </div>
      </div>
    </li>
  );
};