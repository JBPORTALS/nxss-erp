"use client";

import React from "react";

import { DataTable } from "~/app/_components/data-table";
import { useActions } from "./actions";

import "@tanstack/react-table";

import { RouterOutputs } from "@nxss/api";

import { useColumns } from "./columns";

type student = RouterOutputs["students"]["getStudentsByBranchAndSemester"][0];
export function DataTableClient({ data }: { data: student[] }) {
  const { DialogComponent, columns } = useColumns();
  const { DialogComponent: ActionDialogComponent, actions } = useActions();
  return (
    <>
      <DataTable actions={actions} columns={columns} data={data} />
      {DialogComponent}
      {ActionDialogComponent}
    </>
  );
}
