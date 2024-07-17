"use client";

import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from ".";

const profileCardVariants = cva("flex", {
  variants: {
    variant: {
      default: "flex-row items-center gap-3",
    },
  },
});

type ProfileContextType = VariantProps<typeof profileCardVariants>;

const ProfileContext = React.createContext<ProfileContextType>({
  variant: "default",
});

interface ProfileContextProviderProps
  extends React.ComponentProps<typeof ProfileContext.Provider>,
    VariantProps<typeof profileCardVariants> {}

const ProfileContextProvider = ({
  children,
  variant,
  ...props
}: ProfileContextProviderProps) => {
  return (
    <ProfileContext.Provider {...props}>{children}</ProfileContext.Provider>
  );
};

interface ProfileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof profileCardVariants> {}
export default function Profile({
  children,
  className,
  variant,
  ...props
}: ProfileProps) {
  return (
    <div
      className={cn(
        "items-center gap-1.5",
        profileCardVariants({ className, variant }),
      )}
      {...props}
    >
      <ProfileContextProvider value={{ variant }}>
        {children}
      </ProfileContextProvider>
    </div>
  );
}

interface ProfileContentProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const ProfileContent = ({
  children,
  className,
  ...props
}: ProfileContentProps) => {
  return (
    <h2 className={cn("flex w-full flex-col gap-1", className)} {...props}>
      {children}
    </h2>
  );
};

interface ProfileLeftProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const ProfileLeft = ({
  children,
  className,
  ...props
}: ProfileLeftProps) => {
  return (
    <h2 className={cn("flex w-fit items-center gap-10", className)} {...props}>
      {children}
    </h2>
  );
};

interface ProfileRightProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const ProfileRight = ({
  children,
  className,
  ...props
}: ProfileRightProps) => {
  return (
    <h2
      className={cn("flex w-fit items-center justify-end gap-6", className)}
      {...props}
    >
      {children}
    </h2>
  );
};
