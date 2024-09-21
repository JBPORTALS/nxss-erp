"use client";

import { useCallback, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";

import { students } from "@nxss/db/schema";
import { Avatar, AvatarFallback } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import { Checkbox } from "@nxss/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@nxss/ui/dropdown-menu";

import { ToggleStudentDialog } from "~/app/_components/dailog/toggle-student-profile";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = typeof students.$inferSelect;

export const useColumns = () => {
  const [activeStudentId, setActiveStudentId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = useCallback((studentId: number) => {
    setActiveStudentId(studentId);
    setIsDialogOpen(true);
  }, []);

  const columns: ColumnDef<Student>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "full_name",
      header: "Full Name",
      cell(props) {
        return (
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarFallback>
                {props.row.original.full_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span>{props.row.original.full_name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone_number",
      header: "Phone Number",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const student = row.original;
        const [isDialogOpen, setIsDialogOpen] = useState(false);

        return (
          <div className="flex items-center justify-end">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={"icon"} className="h-8 w-8 p-0">
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>View student</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => openDialog(student.id)}>
                  Activate
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return {
    columns,
    DialogComponent: activeStudentId ? (
      <ToggleStudentDialog
        status="active"
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        studentId={activeStudentId}
      />
    ) : null,
  };
};
