import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";

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
    cell(props) {
      return (
        <p className="text-right text-xs text-muted-foreground">
          {props.row.original.updatedAt
            ? formatDistanceToNow(props.row.original.updatedAt, {
                addSuffix: true,
              })
            : ""}
        </p>
      );
    },
  },
];
