"use client";

import { Dispatch, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

import { Button } from "@nxss/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@nxss/ui/dialog";
import { toast } from "@nxss/ui/toast";

export function InviteStaffDialog({
  staffMembers,
  isOpen,
  onOpenChange,
}: {
  staffMembers: { id: number; full_name: string; email: string }[];
  isOpen: boolean;
  onOpenChange: Dispatch<boolean>;
}) {
  const { organization } = useOrganization();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function onInviteStaff() {
    setIsPending(true);
    await Promise.all(
      staffMembers.map(async (staff) => {
        await organization
          ?.inviteMember({
            emailAddress: staff.email,
            role: "org:staff",
          })
          .then((inv) =>
            toast.success(`Invitation sent to ${inv.emailAddress}`),
          )
          .catch((reason) => {
            console.log(reason);
            toast.error(`${staff.email} ${reason.errors[0].message}`);
          });
      }),
    );
    onOpenChange(false);
    router.refresh();
    setIsPending(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Staff Invitation</DialogTitle>
          <DialogDescription>
            Are you sure you want to invite the following staff members to the
            organization?
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[200px] overflow-y-auto">
          <ul className="list-disc pl-5">
            {staffMembers.map((staff) => (
              <li key={staff.id}>
                {staff.full_name} ({staff.email})
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            isLoading={isPending}
            onClick={onInviteStaff}
          >
            Invite Staff
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
