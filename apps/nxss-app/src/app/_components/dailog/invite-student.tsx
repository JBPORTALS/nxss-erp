"use client";

import { Dispatch, useState } from "react";
import { useRouter } from "next/navigation";

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

import { api } from "~/trpc/react";

export function InviteStudentDialog({
  students,
  isOpen,
  onOpenChange,
}: {
  students: { id: number; full_name: string; email: string }[];
  isOpen: boolean;
  onOpenChange: Dispatch<boolean>;
}) {
  const router = useRouter();
  const invite = api.students.inviteStudentMember.useMutation({
    onSuccess(data) {
      toast.success(`Invited ${data.email}`);
      onOpenChange(false);
      router.refresh();
    },
    onError(error) {
      toast.error(`${error.message}`);
    },
  });

  async function onInviteStaff() {
    await Promise.all(
      students.map(async (student) => {
        await invite.mutateAsync({ studentId: student.id });
      }),
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Student Invitation</DialogTitle>
          <DialogDescription>
            Are you sure you want to invite the following staff members to the
            organization?
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[200px] overflow-y-auto">
          <ul className="list-disc pl-5">
            {students.map((student) => (
              <li key={student.id}>
                {student.full_name} ({student.email})
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
            isLoading={invite.isPending}
            onClick={onInviteStaff}
          >
            Invite Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
