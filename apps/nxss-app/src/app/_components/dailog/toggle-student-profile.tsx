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
  DialogTrigger,
} from "@nxss/ui/dialog";
import { toast } from "@nxss/ui/toast";

import { api } from "~/trpc/react";

export function ToggleStudentDialog({
  studentId,
  status,
  isOpen,
  onOpenChange,
}: {
  studentId: number;
  isOpen: boolean;
  status: "active" | "inactive";
  onOpenChange: Dispatch<boolean>;
}) {
  const router = useRouter();
  const { mutateAsync: toggleStatus, isPending } =
    api.students.toggleProfileStatus.useMutation({
      onSuccess: () => {
        router.refresh();
        toast.success("Profile deactivated");
        onOpenChange(false);
      },
    });

  async function onToggleProfile() {
    await toggleStatus({ studentId, newStatus: status });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are your sure?</DialogTitle>
          <DialogDescription>
            you want to {status == "active" ? "activate" : "deactivate"} this
            account.
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
