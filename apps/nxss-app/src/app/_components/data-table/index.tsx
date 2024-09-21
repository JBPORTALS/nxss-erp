"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { easeInOut, motion } from "framer-motion";

import { Button, ButtonProps } from "@nxss/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@nxss/ui/dropdown-menu";
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
  label: string;
  onClick: (selectedRows: TData[]) => void;
}

interface ButtonAction<TData> extends ActionBase<TData> {
  type: "button";
  variant?: ButtonProps["variant"];
}

interface DropdownAction<TData> extends ActionBase<TData> {
  type: "dropdown";
  options: {
    label: string;
    onClick: (selectedRows: TData[]) => void;
  }[];
}

export type Action<TData> = ButtonAction<TData> | DropdownAction<TData>;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actions: Action<TData>[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  actions,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original);
  const selectedRowsCount = selectedRows.length;

  const renderAction = (action: Action<TData>, index: number) => {
    if (action.type === "button") {
      return (
        <Button
          key={index}
          variant={action.variant ?? "secondary"}
          className="ml-2 first:ml-0"
          onClick={() => action.onClick(selectedRows)}
        >
          {action.label}
        </Button>
      );
    } else if (action.type === "dropdown") {
      return (
        <DropdownMenu key={index}>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="ml-2 first:ml-0">
              {action.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {action.options.map((option, optionIndex) => (
              <DropdownMenuItem
                key={optionIndex}
                onClick={() => option.onClick(selectedRows)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  };

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
            {actions.map((action, index) => renderAction(action, index))}
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
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
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
