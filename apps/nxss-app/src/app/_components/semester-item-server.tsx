import Link from "next/link";

import { NavigationMenuItem } from "@nxss/ui/navigation-menu";

import { api } from "~/trpc/server";
import { NavigationMenuItemClient } from "./navigation-menu-client";

export default async function SemesterItemServer({
  semester_id,
  branch_id,
  params,
  ...props
}: React.ComponentProps<typeof NavigationMenuItem> & {
  branch_id: number;
  semester_id: number;
  params: { org: string };
}) {
  const semester = await api.semester.getStatus({ branch_id, semester_id });

  return (
    <Link href={`/${params.org}/branch/${branch_id}/${semester_id}`}>
      <NavigationMenuItemClient status={semester?.status} {...props} />
    </Link>
  );
}
