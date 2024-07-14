"use client";

import { useParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { useFormStatus } from "react-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";

import { revokeInvitation } from "~/trpc/actions";
import { api } from "~/trpc/server";

type MembershipList = Awaited<
  ReturnType<typeof api.organization.getInvitationsList>
>["invitations"][0];

function CancelInvitationButton(props: React.ComponentProps<typeof Button>) {
  const state = useFormStatus();
  return (
    <Button
      variant={"outline"}
      type="submit"
      disabled={state.pending}
      isLoading={state.pending}
      {...props}
    >
      Cancel Invitation
    </Button>
  );
}

export const FacultyInvitationsColumns: ColumnDef<MembershipList>[] = [
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
            <AvatarImage src={undefined} />
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
  // {
  //   accessorKey: "status",
  //   header(props) {
  //     return (
  //       <div className="flex w-full justify-end px-3 text-sm text-muted-foreground">
  //         Status
  //       </div>
  //     );
  //   },
  //   cell(props) {
  //     return (
  //       <div className="ml-auto w-fit rounded-md border border-green-600 bg-green-200 px-3 py-1 text-xs text-green-800 dark:bg-green-950 dark:text-foreground">
  //         Active
  //       </div>
  //     );
  //   },
  // },
  {
    id: "created-at",
    header(props) {
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
      const { org } = useParams();
      return (
        <form
          action={async () => {
            await revokeInvitation({
              slug: org as string,
              invitationId: props.row.original.id,
            });
          }}
          className="flex justify-end"
        >
          <CancelInvitationButton />
        </form>
      );
    },
  },
];
