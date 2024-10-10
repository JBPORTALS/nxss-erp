"use client";

import { useCallback, useState } from "react";
import { Send } from "lucide-react";

import { Button } from "@nxss/ui/button";

import { InviteStaffDialog } from "~/app/_components/dailog/invite-staff";
import { Action } from "~/app/_components/data-table";
import { Staff } from "./columns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const useActions = () => {
  const [activeStaffMembers, setActiveStaffMembers] = useState<Staff[] | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = useCallback((staff: Staff[]) => {
    setActiveStaffMembers(staff);
    setIsDialogOpen(true);
  }, []);

  const actions: Action<Staff>[] = [
    {
      id: "delete",
      cell: (selectedRows) => {
        return (
          <Button
            variant={"secondary"}
            onClick={() => openDialog(selectedRows)}
          >
            <Send className="size-4" />
            Invite
          </Button>
        );
      },
    },
  ];

  return {
    actions,
    DialogComponent: activeStaffMembers ? (
      <InviteStaffDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        staffMembers={activeStaffMembers}
      />
    ) : null,
  };
};
