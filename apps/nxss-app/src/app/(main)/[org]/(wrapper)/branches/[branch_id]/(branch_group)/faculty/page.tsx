import { DataTable } from "~/app/_components/data-table/data-tabel";
import { FacultyColumns } from "~/app/_components/faculty-columns";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { org: string } }) {
  const { members } = await api.organization.getMembershipList({
    slug: params.org,
  });

  return (
    <div>
      <DataTable columns={FacultyColumns} data={members} />
    </div>
  );
}
