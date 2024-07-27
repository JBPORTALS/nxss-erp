import { DataTable } from "~/app/_components/data-tabel";
import { FacultyApproveColumns } from "~/app/_components/faculty-approve-columns";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { org: string } }) {
  const { members } = await api.organization.getMembershipList({
    slug: params.org,
    unApproved: true,
  });

  return (
    <div>
      <DataTable columns={FacultyApproveColumns} data={members} />
    </div>
  );
}
