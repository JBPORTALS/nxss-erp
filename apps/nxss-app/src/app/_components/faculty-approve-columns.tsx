"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";

import { api } from "~/trpc/server";
import { ViewApproveDetailsDialog } from "./dailog/view-approve-details-dialog";

type MembershipList = Awaited<
  ReturnType<typeof api.organization.getMembershipList>
>["members"][0];

export const FacultyApproveColumns: ColumnDef<MembershipList>[] = [
  {
    header: "Sl No.",
    cell(props) {
      return <div>{props.row.index + 1}</div>;
    },
  },
  {
    header: "Staff",
    cell(props) {
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={props.row.original.imageUrl} />
            <AvatarFallback>
              {props.row.original.email?.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span>{props.row.original.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    id: "created-at",
    header() {
      return (
        <div className="flex w-full justify-end text-sm text-muted-foreground">
          Invited
        </div>
      );
    },
    cell(props) {
      return (
        <span className="flex justify-end text-xs text-muted-foreground">
          {formatDistanceToNow(props.row.original.createdAt, {
            addSuffix: true,
          })}
        </span>
      );
    },
  },
  {
    id: "faculty-more-actions",
    cell(props) {
      return (
        <div className="flex justify-end">
          <ViewApproveDetailsDialog staffId={props.row.original.userId}>
            <Button variant={"outline"} type="submit">
              View Details
            </Button>
          </ViewApproveDetailsDialog>
        </div>
      );
    },
  },
];
