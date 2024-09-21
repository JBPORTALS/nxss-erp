"use client";

import React from "react";

import { RouterOutputs } from "@nxss/api";

import { DataTable } from "~/app/_components/data-table";
import { useActions } from "./actions";
import { useColumns } from "./columns";

export function DataTableClient({
  data,
}: {
  data: RouterOutputs["students"]["getStudentsByBranchAndSemester"];
}) {
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
