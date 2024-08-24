import { DataTable } from "~/app/_components/data-tabel";
import { FacultyInvitationsColumns } from "~/app/_components/faculty-invitations-columns";
import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  children: React.ReactNode;
  params: {
    org: string;
    branch_id: string;
    sem_id: string;
  };
}) {
  const { invitations } = await api.organization.getInvitationsList({
    slug: params.org,
  });

  const branch_details = await api.branch.getDetails({ id: params.branch_id });

  return (
    <div>
      <DataTable columns={FacultyInvitationsColumns} data={invitations} />
    </div>
  );
}
