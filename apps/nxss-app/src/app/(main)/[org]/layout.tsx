import React from "react";

import InstitutionBranchSidebar from "~/components/InstitutionBranchSidebar";

export default async function Templates(props: {
  children: React.ReactNode;
  params: { org: string; branch_id: string; semester_id: string };
}) {
  return (
    <div className="h-screen w-full">
      <InstitutionBranchSidebar />
    </div>
  );
}
