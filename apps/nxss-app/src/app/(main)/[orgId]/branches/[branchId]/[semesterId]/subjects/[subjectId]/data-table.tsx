"use client";

import { useParams } from "next/navigation";

import { DataTable } from "~/components/data-table";
import { api } from "~/trpc/react";
import { StudentColumns } from "./columns";

export function StudentsDataTable() {
  const params = useParams();
  const { data } = api.subjects.getAll.useQuery({
    semesterId: params.semesterId,
  });

  return (
    <div className="py-5">
      <DataTable
        emptyStateComponent={
          <div className="flex h-56 flex-col items-center justify-center">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              No subjects yet
            </h4>
            <p className="text-sm text-muted-foreground">
              Add subjects and they will show up here
            </p>
          </div>
        }
        columns={StudentColumns}
        data={data ?? []}
      />
    </div>
  );
}
