import { clerkClient } from "@clerk/nextjs/server";

import { FacultyColumns } from "~/app/_components/faculty-columns";
import { FacultyDataTable } from "~/app/_components/faculty-tabel";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { org: string } }) {
  const { members } = await api.organization.getMembershipList({
    slug: params.org,
  });

  console.log(members);

  return (
    <div>
      <FacultyDataTable columns={FacultyColumns} data={members} />
    </div>
  );
}
