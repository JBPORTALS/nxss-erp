"use client";

import { useCallback, useState } from "react";

import { students } from "@nxss/db/schema";
import { Button } from "@nxss/ui/button";

import { InviteStudentDialog } from "~/app/_components/dailog/invite-student";
import { ToggleStudentDialog } from "~/app/_components/dailog/toggle-student-profile";
import { Action } from "~/app/_components/data-table";
import { Student } from "./columns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const useActions = () => {
  const [activeStudentIds, setActiveStudentId] = useState<number[] | null>(
    null,
  );
  const [activeStudents, setActiveStudents] = useState<
    { full_name: string; id: number; email: string }[] | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isStudentOpen, setIsStudentOpen] = useState(false);

  const openDialog = useCallback((studentId: number[]) => {
    setActiveStudentId(studentId);
    setIsDialogOpen(true);
  }, []);

  const openStudentDialog = useCallback(
    (students: { full_name: string; id: number; email: string }[]) => {
      setActiveStudents(students);
      setIsStudentOpen(true);
    },
    [],
  );

  const actions: Action<Student>[] = [
    {
      id: "invite",
      cell: (selectedRows) => (
        <Button
          variant={"secondary"}
          className="mr-2"
          onClick={() =>
            openStudentDialog(
              selectedRows.map((student) => ({
                id: student.id,
                email: student.email,
                full_name: student.full_name,
              })),
            )
          }
        >
          Invite to Fellow
        </Button>
      ),
    },
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
    DialogComponent: (
      <>
        {activeStudentIds && (
          <ToggleStudentDialog
            status="inactive"
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            studentIds={activeStudentIds}
            isBulk
          />
        )}
        {activeStudents && (
          <InviteStudentDialog
            isOpen={isStudentOpen}
            onOpenChange={setIsStudentOpen}
            students={activeStudents}
          />
        )}
      </>
    ),
  };
};
