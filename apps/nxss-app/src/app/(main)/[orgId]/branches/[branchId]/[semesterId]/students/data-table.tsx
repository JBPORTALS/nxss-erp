"use client";

import { useParams, useSearchParams } from "next/navigation";

import { DataTable } from "~/components/data-table";
import { api } from "~/trpc/react";
import { StudentColumns } from "./columns";

export function StudentsDataTable() {
  const params = useParams();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const status = searchParams.get("status") as "active" | "inactive" | null;
  const { data, isLoading: isFetchingStudents } = api.students.getAll.useQuery({
    semesterId: params.semesterId,
    query,
    status,
  });

  return (
    <div className="py-5">
      <DataTable
        isLoading={isFetchingStudents}
        emptyStateComponent={
          <div className="flex h-56 flex-col items-center justify-center">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              No students yet
            </h4>
            <p className="text-sm text-muted-foreground">
              Add students and they will show up here
            </p>
          </div>
        }
        columns={StudentColumns}
        data={data ?? []}
      />
    </div>
  );
}
