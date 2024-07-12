"use client";

import { cn } from ".";
import NavItem, { NavItemProps } from "./nav-item";



interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
export default function Sidebar({
  children,
  className,
  ...props
}: SidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full w-60 flex-col justify-between gap-6 pl-5 py-4",
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
      className={cn("text-muted-foreground text-xs pt-5 font-semibold ", className)}
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
    <div className={cn("flex h-full flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
};

interface SidebarItemProps extends NavItemProps {}

export const SidebarItem = (props: SidebarItemProps) => <NavItem {...props} />;
