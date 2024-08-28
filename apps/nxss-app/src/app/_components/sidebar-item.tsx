"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarItem } from "@nxss/ui/asidebar";

export function SidebarItemClient({
  children,
  path,
  startsWith = true,
  ...props
}: React.ComponentProps<typeof SidebarItem> & {
  path: string;
  startsWith?: boolean;
}) {
  const pathname = usePathname();
  return (
    <Link href={path}>
      <SidebarItem
        {...props}
        isActive={!startsWith ? pathname == path : pathname.startsWith(path)}
      >
        {children}
      </SidebarItem>
    </Link>
  );
}
