"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarItem } from "@nxss/ui/asidebar";

export function SidebarItemClient({
  children,
  path,
  ...props
}: React.ComponentProps<typeof SidebarItem> & { path: string }) {
  const pathname = usePathname();
  return (
    <Link href={path}>
      <SidebarItem {...props} isActive={pathname.startsWith(path)}>
        {children}
      </SidebarItem>
    </Link>
  );
}
