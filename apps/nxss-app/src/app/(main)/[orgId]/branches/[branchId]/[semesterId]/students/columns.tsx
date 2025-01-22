import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import {
  MoreHorizontalIcon,
  ShieldCheckIcon,
  ShieldMinusIcon,
  Trash2Icon,
  User2,
} from "lucide-react";

import { RouterOutputs } from "@nxss/api";
import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Badge } from "@nxss/ui/badge";
import { Button } from "@nxss/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@nxss/ui/dropdown-menu";

import { ToggleStudentStatusAlertDialog } from "~/components/student-actions";

type Student = RouterOutputs["students"]["getAll"][0];

export const StudentColumns: ColumnDef<Student>[] = [
  {
    header: "Email",
    accessorKey: "email",
    cell(props) {
      return (
        <div className="flex w-48 items-center gap-2">
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
        return (
          <div className="w-32">
            <Badge variant={"warning"}>Inactive</Badge>
          </div>
        );
      else
        return (
          <div className="w-32">
            <Badge variant={"success"}>Active</Badge>
          </div>
        );
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
      const [isDeactivateAlertDialogOpen, setIsDeactivateAlertDialogOpen] =
        React.useState(false);
      const [isActivateAlertDialogOpen, setIsActivateAlertDialogOpen] =
        React.useState(false);
      const student = props.row.original;
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-auto" size={"icon"} variant={"ghost"}>
                <MoreHorizontalIcon strokeWidth={1} className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[160px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {student.status === "active" ? (
                  <DropdownMenuItem
                    onClick={(e) => setIsDeactivateAlertDialogOpen(true)}
                    className="text-warning focus:bg-warning/30 focus:text-warning flex items-center gap-2"
                  >
                    <ShieldMinusIcon className="size-5" /> Deactive
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={(e) => setIsActivateAlertDialogOpen(true)}
                    className="text-success focus:bg-success/30 focus:text-success flex items-center gap-2"
                  >
                    <ShieldCheckIcon className="size-5" /> Activate
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:bg-destructive/30 focus:text-destructive">
                  <Trash2Icon className="size-5" /> Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <ToggleStudentStatusAlertDialog
            status={"inactive"}
            key={"Deactivate student"}
            studentId={student.id}
            open={isDeactivateAlertDialogOpen}
            onOpenChange={setIsDeactivateAlertDialogOpen}
          />
          <ToggleStudentStatusAlertDialog
            key={"Activate student"}
            status={"active"}
            studentId={student.id}
            open={isActivateAlertDialogOpen}
            onOpenChange={setIsActivateAlertDialogOpen}
          />
        </div>
      );
    },
  },
];
