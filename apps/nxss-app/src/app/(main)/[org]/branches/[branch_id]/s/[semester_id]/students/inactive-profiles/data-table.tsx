"use client";

import React from "react";

import { DataTable } from "~/app/_components/data-table";
import { actions } from "./actions";

import "@tanstack/react-table";

import { RouterOutputs } from "@nxss/api";

import { useColumns } from "./columns";

export function DataTableClient({
  data,
}: {
  data: RouterOutputs["students"]["getStudentsByBranchAndSemester"];
}) {
  const { DialogComponent, columns } = useColumns();
  return (
    <>
      <DataTable actions={actions} columns={columns} data={data} />
      {DialogComponent}
    </>
  );
}
