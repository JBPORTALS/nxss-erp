"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { easeInOut } from "framer-motion";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nxss/ui/table";

import { MotionDiv } from "./motion-elements";

interface ActionBase<TData> {
  id: string;
  cell: (selectedRows: TData[]) => React.ReactNode;
}

export type Action<TData> = ActionBase<TData>;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actions?: Action<TData>[];
  expandedContent?: (row: TData) => React.ReactNode;
  enableExpanding?: boolean;
  getRowCanExpand?: (row: Row<TData>) => boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  actions = [],
  expandedContent,
  enableExpanding = false,
  getRowCanExpand,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [expanded, setExpanded] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getRowCanExpand,
    enableExpanding,
    state: {
      rowSelection,
      expanded,
    },
  });

  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original);
  const selectedRowsCount = selectedRows.length;

  return (
    <div>
      {selectedRowsCount > 0 && (
        <MotionDiv
          initial={{ scaleY: 0.5, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ easings: easeInOut(160), delay: 0.1 }}
          className="mb-4 flex items-center justify-between rounded-md bg-accent/50 px-4 py-2"
        >
          <span className="text-sm text-muted-foreground">
            {selectedRowsCount} row(s) selected
          </span>
          <div>
            {actions.map((action) => (
              <React.Fragment key={action.id}>
                {action.cell(selectedRows)}
              </React.Fragment>
            ))}
          </div>
        </MotionDiv>
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && expandedContent && (
                  <>{expandedContent(row.original)}</>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
