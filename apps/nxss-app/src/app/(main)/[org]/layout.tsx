import React from "react";

import {
  BranchDetialsSidebar,
  InstitutionBranchSidebar,
  InstitutionDetailsSidebar,
} from "~/components/sidebar";

export default async function Templates(props: {
  children: React.ReactNode;
  params: { org: string; branch_id: string; semester_id: string };
}) {
  return (
    <div className="flex min-h-screen flex-1">
      <aside className="sticky top-0 z-20 flex h-screen shrink-0">
        <InstitutionBranchSidebar />
        {/* <InstitutionDetailsSidebar /> */}
        <BranchDetialsSidebar />
      </aside>
      <main className="w-full min-w-0 flex-1 overflow-y-hidden">
        {props.children}
      </main>
    </div>
  );
}
