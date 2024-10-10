import { api } from "~/trpc/server";
import { Staff } from "./columns";
import { DataTableClient } from "./data-table";

async function getData(): Promise<Staff[]> {
  // Fetch data from your API here.
  return api.staff.getAllStaff();
}

const Faculty = async ({}: {
  params: { branch_id: string; semester_id: string };
}) => {
  const data = await getData();

  return <DataTableClient data={data} />;
};

export default Faculty;
