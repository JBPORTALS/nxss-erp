"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import { Checkbox } from "@nxss/ui/checkbox";
import { Input } from "@nxss/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nxss/ui/table";

type Student = {
  id: string;
  name: string;
  avatarSrc: string;
  maximummarks: number;
  passingmarks: number;
  ObtainedMarks: number;
  result: string;
};

const studentsData: Student[] = [
  {
    id: "465CS21001",
    name: "Olivia Rhye",
    avatarSrc: "/api/placeholder/32",
    maximummarks: 100,
    passingmarks: 50,
    ObtainedMarks: 20,
    result: "Pass",
  },
  // Add more student data here...
];

const columns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={row.original.avatarSrc} alt={row.original.name} />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div>{row.original.name}</div>
          <div className="text-sm text-muted-foreground">{row.original.id}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "maximummarks",
    header: "Maximum Marks ",
  },
  {
    accessorKey: "passingmarks",
    header: "Passing Marks ",
  },
  {
    accessorKey: "ObtainedMarks",
    header: "Obtained Marks",
  },
  {
    accessorKey: "result",
    header: "Results Pass/Fail",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <Button variant="ghost" size="sm" className="border">
        <Edit className="size-4" />
      </Button>
    ),
  },
];

export function StudentTestListTable() {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: studentsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="w-full p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="relative">
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-96 pl-10"
          />
          <Search className="absolute left-3 top-2 text-gray-400" size={20} />
        </div>
        <Button variant="outline">Download</Button>
      </div>

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

export default StudentTestListTable;
