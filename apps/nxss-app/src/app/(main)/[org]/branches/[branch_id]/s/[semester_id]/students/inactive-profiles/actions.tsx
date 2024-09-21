"use client";

import { Button } from "@nxss/ui/button";

import { Action } from "~/app/_components/data-table";
import { Student } from "./columns";

export const actions: Action<Student>[] = [
  {
    id: "delete",
    cell: (selectedRows) => <Button>Deactivate</Button>,
  },
];
