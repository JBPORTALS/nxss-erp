"use client";

import { Dispatch } from "react";
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

export function ToggleStudentDialog({
  studentId,
  status,
  isOpen,
  onOpenChange,
  isBulk,
  studentIds,
  onSuccess,
}: {
  studentId?: number;
  isOpen: boolean;
  status: "active" | "inactive";
  studentIds?: number[];
  isBulk?: boolean;
  onSuccess?: () => void;
  onOpenChange: Dispatch<boolean>;
}) {
  const router = useRouter();
  const { mutateAsync: toggleStatus, isPending } =
    api.students.toggleProfileStatus.useMutation({
      onSuccess: () => {
        router.refresh();
        onSuccess?.();
        toast.success("Profile deactivated");
        onOpenChange(false);
      },
    });

  async function onToggleProfile() {
    if (isBulk && studentIds)
      await toggleStatus(
        studentIds.map((studentId) => ({ studentId, newStatus: status })),
      );
    else if (studentId && !isBulk)
      await toggleStatus({ studentId, newStatus: status });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are your sure?</DialogTitle>
          <DialogDescription>
            you want to {status == "active" ? "activate" : "deactivate"}{" "}
            {isBulk ? "these accounts" : "this account"}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={status == "active" ? "primary" : "destructive"}
            isLoading={isPending}
            onClick={onToggleProfile}
          >
            {status === "active" ? "Activate" : "Deactivate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
