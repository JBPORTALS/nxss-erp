"use client";

import React from "react";

import { DataTable } from "~/app/_components/data-table";
import { useActions } from "./actions";

import "@tanstack/react-table";

import { Staff, useColumns } from "./columns";

export function DataTableClient({ data }: { data: Staff[] }) {
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
