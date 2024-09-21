import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

export default async function BranchPage({
  params,
}: {
  params: { branch_id: string; org: string };
}) {
  const branchId = parseInt(params.branch_id);

  if (isNaN(branchId)) {
    throw new Error("Invalid branch ID");
  }

  const defaultSemester = await api.semester.getDefaultSemester({
    branchId,
  });

  console.log(defaultSemester);

  if (defaultSemester) {
    redirect(`/${params.org}/branches/${branchId}/s/${defaultSemester.id}`);
  } else {
    // Handle the case where no default semester is found
    return <div>No active or upcoming semesters found for this branch.</div>;
  }
}
