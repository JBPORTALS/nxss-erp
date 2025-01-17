import { ColumnDef } from "@tanstack/react-table";

import { RouterOutputs } from "@nxss/api";

type Student = RouterOutputs["students"]["getAll"][0];

export const StudentColumns: ColumnDef<Student>[] = [
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: () => <div className="text-right">Last updated</div>,
    accessorKey: "updatedAt",
  },
];
