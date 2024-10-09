"use client";

import { useCallback, useState } from "react";

import { Button } from "@nxss/ui/button";

import { ToggleStudentDialog } from "~/app/_components/dailog/toggle-student-profile";
import { Action } from "~/app/_components/data-table";
import { Student } from "./columns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const useActions = () => {
  const [activeStudentIds, setActiveStudentId] = useState<number[] | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = useCallback((studentId: number[]) => {
    setActiveStudentId(studentId);
    setIsDialogOpen(true);
  }, []);

  const actions: Action<Student>[] = [
    {
      id: "delete",
      cell: (selectedRows) => (
        <Button
          variant={"destructive"}
          onClick={() => openDialog(selectedRows.map((student) => student.id))}
        >
          Deactivate
        </Button>
      ),
    },
  ];

  return {
    actions,
    DialogComponent: activeStudentIds ? (
      <ToggleStudentDialog
        status="inactive"
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        studentIds={activeStudentIds}
        isBulk
      />
    ) : null,
  };
};
