"use client";

import { useParams, usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuButton,
  NavigationMenuContent,
  NavigationMenuItem,
} from "@nxss/ui/navigation-menu";

export function TestMenuButtonClient({
  ...props
}: React.ComponentProps<typeof NavigationMenuButton>) {
  const pathname = usePathname();
  return (
    <NavigationMenuButton
      className="px-4 py-2"
      {...props}
      open={pathname.startsWith(`/rjs/branch/1/1/subject/1/test`)}
    />
  );
}

export function TestMenuClient({
  ...props
}: React.ComponentProps<typeof NavigationMenu>) {
  return <NavigationMenu {...props} />;
}

export function TestMenuItemClient({
  id,
  ...props
}: React.ComponentProps<typeof NavigationMenuItem>) {
  const pathname = usePathname();
  const params = useParams();

  console.log(pathname, params);

  return (
    <NavigationMenuItem
      {...props}
      isActive={pathname.startsWith(`/rjs/branch/1/1/subject/1/test/${id}`)}
    />
  );
}

export function TestMenuContentClient({
  ...props
}: React.ComponentProps<typeof NavigationMenuContent>) {
  const pathname = usePathname();

  return (
    <NavigationMenuContent
      {...props}
      open={pathname.startsWith(`/rjs/branch/1/1/subject/1/test`)}
    />
  );
}
