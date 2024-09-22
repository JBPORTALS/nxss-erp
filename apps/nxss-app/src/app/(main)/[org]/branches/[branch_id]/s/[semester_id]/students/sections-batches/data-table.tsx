"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";

import { SectionWithBatches } from "@nxss/api";
import { Button } from "@nxss/ui/button";
import { TableCell, TableRow } from "@nxss/ui/table";

import { DataTable } from "~/app/_components/data-table";
import { useColumns } from "./columns";

interface DataTableClientProps {
  data: SectionWithBatches[];
}

export function DataTableClient({ data }: DataTableClientProps) {
  const columns = useColumns();
  const params = useParams();

  const expandedContent = (row: SectionWithBatches) => (
    <>
      {row.batches.map((batch) => (
        <TableRow
          key={batch.id}
          className="w-full items-center justify-between py-1"
        >
          <TableCell></TableCell>
          <TableCell>
            <Link
              href={`/${params.org}/branches/${params.branch_id}/s/${params.semester_id}/students/sections-batches/${row.section_id}/${batch.id}`}
            >
              <Button variant={"link"} className="justify-start px-0">
                {batch.name}
              </Button>
            </Link>
          </TableCell>
          <TableCell>{batch.studentCount}</TableCell>
          <TableCell>
            <Button className="size-8" variant={"ghost"}>
              <MoreVertical className="size-4 text-foreground" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  const getRowCanExpand = React.useCallback(
    (row: Row<SectionWithBatches>) => row.original.batches.length > 0,
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      expandedContent={expandedContent}
      enableExpanding={true}
      getRowCanExpand={getRowCanExpand}
    />
  );
}
