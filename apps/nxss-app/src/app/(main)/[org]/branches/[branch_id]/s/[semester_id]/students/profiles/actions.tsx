"use client";

import { Action } from "~/app/_components/data-table";
import { Student } from "./columns";

export const actions: Action<Student>[] = [
  {
    type: "button",
    label: "Deactivate",
    onClick: (student) => {},
    variant: "destructive",
  },
];
