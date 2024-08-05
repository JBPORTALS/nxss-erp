import Link from "next/link";
import { BoxIcon } from "lucide-react";

import { RouterOutputs } from "@nxss/api";
import { NavigationMenuText } from "@nxss/ui/navigation-menu";

import {
  NavigationMenuButtonClient,
  NavigationMenuClient,
  NavigationMenuContentClient,
} from "./navigation-menu-client";
import SemesterItemServer from "./semester-item-server";

export default function BranchListClient({
  branchList,
  params,
}: {
  branchList: RouterOutputs["branch"]["getBranchList"];
  params: { org: string };
}) {
  return (
    <div className="w-full">
      {branchList.map((branch) => (
        <NavigationMenuClient key={branch.id} branch_id={branch.id}>
          <Link href={`/${params.org}/branch/${branch.id}`}>
            {/* open is used to make the button active */}
            <NavigationMenuButtonClient branch_id={branch.id}>
              <BoxIcon className="size-4 flex-shrink-0" />
              <NavigationMenuText>{branch.name}</NavigationMenuText>
            </NavigationMenuButtonClient>
          </Link>
          <NavigationMenuContentClient branch_id={branch.id}>
            {[...Array(branch.semesters)].map((_, index) => (
              <SemesterItemServer 
                key={branch.id}
                branch_id={branch.id}
                semester_id={index + 1}
                params={params}
              >
                Semester {index + 1}
              </SemesterItemServer>
            ))}
          </NavigationMenuContentClient>
        </NavigationMenuClient>
      ))}
    </div>
  );
}
