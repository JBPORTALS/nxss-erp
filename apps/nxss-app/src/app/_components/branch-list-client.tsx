// import Link from "next/link";
// import { BoxIcon } from "lucide-react";

// import { RouterOutputs } from "@nxss/api";
// import { NavigationMenuText } from "@nxss/ui/navigation-menu";

// import {
//   NavigationMenuButtonClient,
//   NavigationMenuClient,
//   NavigationMenuContentClient,
// } from "./navigation-menu-client";
// import SemesterItemServer from "./semester-item-server";

// export default function BranchListClient({
//   branchList,
//   params,
// }: {
//   branchList: RouterOutputs["branch"]["getBranchList"];
//   params: { org: string };
// }) {
//   return (
//     <div className="w-full">
//       {branchList.map((branch) => (
//         <NavigationMenuClient key={branch.id} branch_id={branch.id}>
//           <Link href={`/${params.org}/branch/${branch.id}`}>
//             {/* open is used to make the button active */}
//             <NavigationMenuButtonClient branch_id={branch.id}>
//               <BoxIcon className="size-4 flex-shrink-0" />
//               <NavigationMenuText>{branch.name}</NavigationMenuText>
//             </NavigationMenuButtonClient>
//           </Link>
//           <NavigationMenuContentClient branch_id={branch.id}>
//             {[...Array(branch.semesters)].map((_, index) => (
//               <SemesterItemServer
//                 key={branch.id}
//                 branch_id={branch.id}
//                 semester_id={index + 1}
//                 params={params}
//               >
//                 Semester {index + 1}
//               </SemesterItemServer>
//             ))}
//           </NavigationMenuContentClient>
//         </NavigationMenuClient>
//       ))}
//     </div>
//   );
// }
import Link from "next/link";
import { BoxIcon } from "lucide-react";

import { RouterOutputs } from "@nxss/api";
import { NavigationMenuText } from "@nxss/ui/navigation-menu";

import BatchItemServer from "./batch-item-server";
import {
  NavigationMenuButtonClient,
  NavigationMenuClient,
  NavigationMenuContentClient,
} from "./navigation-menu-client";

export default function SectionListClient({
  params,
}: {
  params: { org: string };
  branchList: RouterOutputs["branch"]["getBranchList"];
}) {
  // Create an array of branches with 'id' as a number
  const SectionList = [
    {
      id: 1, // Changed to number
      name: "Section A",
      batches: 2,
    },
    {
      id: 2, // Changed to number
      name: "Section B",
      batches: 1,
    },
  ];

  // Example organization parameter

  return (
    <div className="w-full">
      {SectionList.map((section) => (
        <NavigationMenuClient key={section.id} section_id={section.id}>
          <Link href={`/${params.org}/branch/1/1/${section.id}`}>
            {/* open is used to make the button active */}
            <NavigationMenuButtonClient section_id={section.id}>
              <BoxIcon className="size-4 flex-shrink-0" />
              <NavigationMenuText>{section.name}</NavigationMenuText>
            </NavigationMenuButtonClient>
          </Link>
          <NavigationMenuContentClient section_id={section.id}>
            {[...Array(section.batches)].map((_, index) => (
              <BatchItemServer
                key={`${section.id}/${index + 1}`}
                section_id={section.id}
                batch_id={index + 1} // Passing a number for semester_id
                params={params}
              >
                Batch {index + 1}
              </BatchItemServer>
            ))}
          </NavigationMenuContentClient>
        </NavigationMenuClient>
      ))}
    </div>
  );
}
