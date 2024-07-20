import { DataTable } from "~/app/_components/data-tabel";
import { FacultyInvitationsColumns } from "~/app/_components/faculty-invitations-columns";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { org: string } }) {
  const { invitations } = await api.organization.getInvitationsList({
    slug: params.org,
  });

  return (
    <div>
      <DataTable columns={FacultyInvitationsColumns} data={invitations} />
    </div>
  );
}
