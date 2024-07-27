"use client";

import { OrganizationMembership } from "@clerk/nextjs/server";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon, TriangleAlertIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@nxss/ui/dropdown-menu";

import { api } from "~/trpc/server";

type MembershipList = Awaited<
  ReturnType<typeof api.organization.getMembershipList>
>["members"][0];

export const FacultyColumns: ColumnDef<MembershipList>[] = [
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
          <Avatar className="size-8 border">
            <AvatarImage src={props.row.original.imageUrl} />
            <AvatarFallback>
              {props.row.original.email?.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <span>
              {props.row.original.firstName} {props.row.original.lastName}
            </span>
            <span className="text-sm text-muted-foreground">
              {props.row.original?.email}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-destructive hover:text-destructive">
                <TriangleAlertIcon className="mr-2 size-4" /> Deactivate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
