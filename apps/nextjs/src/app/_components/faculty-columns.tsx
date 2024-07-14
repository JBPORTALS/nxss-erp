import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";

type StaffMember = {
  id: string;
  name?: string;
  email: string;
  status: "active" | "inactive";
  image: string;
};

export const staffMembers: StaffMember[] = [
  {
    id: "728ed52f",
    status: "active",
    email: "m@example.com",
    name: "Manu",
    image: "https://github.com/jbportals.png",
  },
  {
    id: "489e1d42",
    status: "active",
    email: "shad@gmail.com",
    name: "Shadcn",
    image: "https://github.com/shadcn.png",
  },
  {
    id: "489e1d42",
    status: "active",
    email: "example@gmail.com",
    name: "Manu",
    image: "https://github.com/x-sss-x.png",
  },
  // ...
];

export const FacultyColumns: ColumnDef<StaffMember>[] = [
  {
    header: "Sl No.",
    cell(props) {
      return <div>{props.row.index + 1}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Staff",
    cell(props) {
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={props.row.original.image} />
            <AvatarFallback>
              {props.row.original.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span>{props.row.original.name}</span>
            <span className="text-sm text-muted-foreground">
              {props.row.original.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header(props) {
      return (
        <div className="flex w-full justify-end px-3 text-sm text-muted-foreground">
          Status
        </div>
      );
    },
    cell(props) {
      return (
        <div className="ml-auto w-fit rounded-md border border-green-600 bg-green-200 px-3 py-1 text-xs text-green-800 dark:bg-green-950 dark:text-foreground">
          Active
        </div>
      );
    },
  },
  {
    id: "faculty-more-actions",
    cell(props) {
      return (
        <div className="flex justify-end">
          <Button variant={"ghost"} size={"icon"}>
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </div>
      );
    },
  },
];
