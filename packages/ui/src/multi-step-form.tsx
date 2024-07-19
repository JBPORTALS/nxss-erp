"use client";

import React, { useEffect, useRef, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";

import { cn } from ".";

const StepVariants = cva(
  "flex size-6 items-center justify-center rounded-full border-2 bg-white",
  {
    variants: {
      variant: {
        completed: "border-green-500",
        inProcess: "border-black",
      },
    },
    defaultVariants: {
      variant: "inProcess",
    },
  },
);

type VariantKeys = VariantProps<typeof StepVariants>["variant"];

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantKeys;
}

export function MultiStepForm({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [lineHeight, setLineHeight] = useState<number>(0);
  const statusBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statusBarRef.current) {
      const steps = Array.from(
        statusBarRef.current.querySelectorAll(".add-status"),
      );
      if (steps.length > 1) {
        // Ensure there are at least two steps
        const firstStep = steps[0];
        const lastStep = steps[steps.length - 1];

        if (firstStep && lastStep) {
          // Ensure firstStep and lastStep are defined
          const firstStepTop = firstStep.getBoundingClientRect().top;
          const lastStepIcon = lastStep.querySelector(".step-icon");
          if (lastStepIcon instanceof HTMLElement) {
            // Type guard
            const lastStepIconBottom =
              lastStepIcon.getBoundingClientRect().bottom;
            const newHeight = lastStepIconBottom - firstStepTop;
            setLineHeight(newHeight);
          }
        }
      } else {
        setLineHeight(0); // No line if there's only one or no steps
      }
    }
  }, [children]);

  return (
    <div
      ref={statusBarRef}
      className={cn("relative ml-6", className)}
      {...props}
    >
      <ul className="list-none space-y-6">{children}</ul>
      {lineHeight > 0 && (
        <div
          className="absolute left-[12px] top-0 w-[1.5px] bg-muted-foreground"
          style={{ height: `${lineHeight}px` }}
        />
      )}
    </div>
  );
}

export const Step = ({ children, className, variant, ...props }: StepProps) => {
  return (
    <li className="add-status mb-16 flex items-start space-x-2">
      <div
        className={cn(
          "step-icon z-20 flex-shrink-0",
          StepVariants({ variant }),
          className,
        )}
      >
        {variant === "completed" && (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-check text-green-500"
            initial="hidden"
            animate="visible"
          >
            <motion.path
              d="M5 12l4 4L20 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </motion.svg>
        )}
      </div>
      <div className="flex-grow">
        <div
          className={cn("ml-4 flex w-full flex-col gap-5", className)}
          {...props}
        >
          {children}
        </div>
      </div>
    </li>
  );
};