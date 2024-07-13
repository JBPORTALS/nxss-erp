"use client";

import { cn } from ".";
import { NavItem, NavItemProps } from "./nav-item";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Sidebar({ children, className, ...props }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-screen w-60 flex-col justify-between gap-6 border-r py-4 pl-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface SidebarLabelProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const SidebarLabel = ({
  children,
  className,
  ...props
}: SidebarLabelProps) => {
  return (
    <h2
      className={cn(
        "pt-5 text-xs font-semibold text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

interface SidebarBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarBody = ({
  children,
  className,
  ...props
}: SidebarBodyProps) => {
  return (
    <div
      className={cn("-mr-px flex h-full flex-col gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface SidebarItemProps extends NavItemProps {}

export const SidebarItem = (props: SidebarItemProps) => <NavItem {...props} />;
