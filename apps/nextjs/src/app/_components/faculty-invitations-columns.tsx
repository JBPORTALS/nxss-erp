"use client";

import { useParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import { useFormStatus } from "react-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import { toast } from "@nxss/ui/toast";

import { revokeInvitation } from "~/trpc/actions";
import { api } from "~/trpc/server";

type MembershipList = Awaited<
  ReturnType<typeof api.organization.getInvitationsList>
>["invitations"][0];

//just to track the state of the form
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
      const { org } = useParams();
      return (
        <form
          action={async () => {
            await revokeInvitation({
              slug: org as string,
              invitationId: props.row.original.id,
            }).then(() =>
              toast.info("Invitation Cancelled", {
                description: `for ${props.row.original.email}`,
                richColors: true,
              }),
            );
          }}
          className="flex justify-end"
        >
          <CancelInvitationButton />
        </form>
      );
    },
  },
];
