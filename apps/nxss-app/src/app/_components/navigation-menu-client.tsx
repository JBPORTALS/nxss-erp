"use client";

import { useParams, usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuButton,
  NavigationMenuContent,
} from "@nxss/ui/navigation-menu";

export function NavigationMenuButtonClient({
  branch_id,
  ...props
}: React.ComponentProps<typeof NavigationMenuButton> & { branch_id: number }) {
  const pathname = usePathname();
  const params = useParams();
  return (
    <NavigationMenuButton
      {...props}
      open={pathname.startsWith(`/${params.org}/branch/${branch_id}`)}
    />
  );
}

export function NavigationMenuClient({
  branch_id,
  ...props
}: React.ComponentProps<typeof NavigationMenu> & { branch_id: number }) {
  return <NavigationMenu {...props} />;
}

export function NavigationMenuContentClient({
  branch_id,
  ...props
}: React.ComponentProps<typeof NavigationMenuContent> & { branch_id: number }) {
  const pathname = usePathname();
  const params = useParams();

  return (
    <NavigationMenuContent
      {...props}
      open={pathname.startsWith(`/${params.org}/branch/${branch_id}`)}
    />
  );
}
