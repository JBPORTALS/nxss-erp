"use client";

import { useParams, usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuButton,
  NavigationMenuContent,
  NavigationMenuItem,
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
  ...props
}: React.ComponentProps<typeof NavigationMenu> & { branch_id: number }) {
  return <NavigationMenu {...props} />;
}

export function NavigationMenuItemClient({
  sem_id,
  ...props
}: React.ComponentProps<typeof NavigationMenuItem> & { sem_id: number }) {
  const pathname = usePathname();
  const params = useParams();

  console.log(pathname, params);

  return (
    <NavigationMenuItem
      {...props}
      isActive={
        pathname.startsWith(
          `/${params.org}/branch/${params.branch_id}/${params.sem_id}`,
        ) && params.sem_id == sem_id.toString()
      }
    />
  );
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
