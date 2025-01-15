import React from "react";

import {
  InstitutionBranchSidebar,
  InstitutionDetailsSidebar,
} from "~/components/sidebar";

export default async function Templates(props: {
  children: React.ReactNode;
  params: { org: string; branch_id: string; semester_id: string };
}) {
  return (
    <div className="flex h-screen w-full">
      <InstitutionBranchSidebar />
      <InstitutionDetailsSidebar />
      {/* <BranchDetialsSidebar /> */}
      <main>{props.children}</main>
    </div>
  );
}
