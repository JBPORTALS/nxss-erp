"use client";

import { useParams, usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuButton,
  NavigationMenuContent,
  NavigationMenuItem,
} from "@nxss/ui/navigation-menu";

export function NavigationMenuButtonClient({
  section_id,
  ...props
}: React.ComponentProps<typeof NavigationMenuButton> & { section_id: number }) {
  const pathname = usePathname();
  const params = useParams();
  return (
    <NavigationMenuButton
      {...props}
      open={pathname.startsWith(
        `/${params.org}/branch/${params.branch_id}/${params.sem_id}/${section_id}`,
      )}
    />
  );
}

export function NavigationMenuClient({
  ...props
}: React.ComponentProps<typeof NavigationMenu> & { section_id: number }) {
  return <NavigationMenu {...props} />;
}

export function NavigationMenuItemClient({
  batch_id,
  ...props
}: React.ComponentProps<typeof NavigationMenuItem> & { batch_id: number }) {
  const pathname = usePathname();
  const params = useParams();

  console.log(pathname, params);

  return (
    <NavigationMenuItem
      {...props}
      isActive={
        pathname.startsWith(
          `/${params.org}/branch/${params.branch_id}/${params.sem_id}/${params.section_id}/${batch_id}`,
        ) && params.batch_id == batch_id.toString()
      }
    />
  );
}

export function NavigationMenuContentClient({
  section_id,
  ...props
}: React.ComponentProps<typeof NavigationMenuContent> & {
  section_id: number;
}) {
  const pathname = usePathname();
  const params = useParams();

  return (
    <NavigationMenuContent
      {...props}
      open={pathname.startsWith(
        `/${params.org}/branch/${params.branch_id}/${params.sem_id}/${section_id}`,
      )}
    />
  );
}
