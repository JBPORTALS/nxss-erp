"use client";

import { cn } from ".";
import { NavItem, NavItemProps } from "./nav-item";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Sidebar({ children, className, ...props }: SidebarProps) {
  return (
    <div
      className={cn(
        "sticky inset-0 flex w-60 shrink-0 flex-col gap-4 border-r py-4 pl-5",
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
      className={cn("text-xs font-semibold text-muted-foreground", className)}
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
      className={cn("-mr-px flex h-fit flex-col gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface SidebarItemProps extends NavItemProps {}

export const SidebarItem = (props: SidebarItemProps) => <NavItem {...props} />;