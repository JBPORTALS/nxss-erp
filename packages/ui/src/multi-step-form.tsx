"use client";

import React, { useEffect, useRef, useState } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from ".";

const StepVariants = cva(
  "flex size-6 items-center justify-center rounded-full border-2 bg-background",
  {
    variants: {
      variant: {
        completed: "border-green-500",
        inProcess: "border-border",
      },
    },
    defaultVariants: {
      variant: "inProcess",
    },
  },
);

type VariantKeys = VariantProps<typeof StepVariants>["variant"];

interface StepProps extends React.HTMLAttributes<HTMLLIElement> {
  variant?: VariantKeys;
  disabled?: boolean;
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
        const firstStep = steps[0];
        const lastStep = steps[steps.length - 1];

        if (firstStep && lastStep) {
          const firstStepTop = firstStep.getBoundingClientRect().top;
          const lastStepIcon = lastStep.querySelector(".step-icon");
          if (lastStepIcon instanceof HTMLElement) {
            const lastStepIconBottom =
              lastStepIcon.getBoundingClientRect().bottom;
            const newHeight = lastStepIconBottom - firstStepTop;
            setLineHeight(newHeight);
          }
        }
      } else {
        setLineHeight(0);
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
          className="absolute left-[11.5px] top-0 w-[1.5px] bg-muted"
          style={{ height: `${lineHeight-22}px` }}
        />
      )}
    </div>
  );
}

export const Step = ({ children, className, variant, disabled, ...props }: StepProps) => {
  return (
    <li
      className={cn("add-status mb-16 flex items-start space-x-2", {
        "opacity-50 pointer-events-none": disabled,
      })}
    >
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
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-check text-green-500"
            initial="hidden"
            animate="visible"
          >
            <motion.path
              d="M20 6 9 17l-5-5"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.svg>
        )}
      </div>
      <div className="flex-grow">
        <div
          className={cn("ml-4 flex w-full flex-col gap-5", className)}
        >
          {children}
        </div>
      </div>
    </li>
  );
};