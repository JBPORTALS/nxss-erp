import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { MoreVerticalIcon, User2 } from "lucide-react";

import { RouterOutputs } from "@nxss/api";
import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Badge } from "@nxss/ui/badge";
import { Button } from "@nxss/ui/button";

type Student = RouterOutputs["students"]["getAll"][0];

export const StudentColumns: ColumnDef<Student>[] = [
  {
    header: "Email",
    accessorKey: "email",
    cell(props) {
      return (
        <div className="flex items-center gap-2">
          <Avatar className="border-2 border-border">
            <AvatarImage />
            <AvatarFallback>
              <User2 strokeWidth={1} className="text-muted-foreground/70" />
            </AvatarFallback>
          </Avatar>
          <p>{props.row.original.email}</p>
        </div>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell(props) {
      if (props.row.original.status === "inactive")
        return <Badge variant={"secondary"}>Inactive</Badge>;
      else return <Badge variant={"success"}>Active</Badge>;
    },
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
