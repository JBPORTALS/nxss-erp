import Link from "next/link";

import { NavigationMenuItem } from "@nxss/ui/navigation-menu";

import { NavigationMenuItemClient } from "../navigation-menu-client";

export default function BatchItemServer({
  section_id,
  batch_id,
  params,
  ...props
}: React.ComponentProps<typeof NavigationMenuItem> & {
  section_id: number;
  batch_id: number;
  params: { org: string };
}) {
  return (
    <Link href={`/${params.org}/branch/1/1/${section_id}/${batch_id}`}>
      <NavigationMenuItemClient batch_id={batch_id} {...props} />
    </Link>
  );
}
