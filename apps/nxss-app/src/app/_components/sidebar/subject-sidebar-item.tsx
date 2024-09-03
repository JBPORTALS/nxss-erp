"use client";

import { usePathname } from "next/navigation";

import { SidebarItemClient } from "./sidebar-item";

export function SubjectSidebarItem({
  path,
  ...props
}: React.ComponentProps<typeof SidebarItemClient>) {
  const pathname = usePathname();
  const baseSubjectPathname = pathname
    ?.split("/")
    .slice(0, 7)
    .join("/")
    .concat(path);
  return (
    <SidebarItemClient
      startsWith={false}
      path={baseSubjectPathname}
      {...props}
    />
  );
}
