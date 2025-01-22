import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { MoreVerticalIcon } from "lucide-react";

import { RouterOutputs } from "@nxss/api";
import { Button } from "@nxss/ui/button";

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
  {
    id: "more-actions",
    header() {
      return <div className="w-fit text-right"></div>;
    },
    cell(props) {
      return (
        <div className="text-right">
          <Button className="ml-auto" size={"icon"} variant={"ghost"}>
            <MoreVerticalIcon strokeWidth={1} className="size-4" />
          </Button>
        </div>
      );
    },
  },
];
