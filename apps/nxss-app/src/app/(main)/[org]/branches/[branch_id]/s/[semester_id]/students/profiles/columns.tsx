"use client";

import { ColumnDef } from "@tanstack/react-table";

import { students } from "@nxss/db/schema";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = typeof students.$inferSelect;

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
