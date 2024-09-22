"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Edit, MoreVertical, Move, Search, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@nxss/ui/dropdown-menu";
import { Input } from "@nxss/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nxss/ui/table";

import { StudentInviteDialog } from "../dailog/add-students";
import { InviteDialog } from "../dailog/invite-dialog";

type Student = {
  id: string;
  name: string;
  Attendence: number;
  avatarSrc: string;
};

const data: Student[] = [
  { id: "465CS21001", name: "Narayan R", Attendence: 90, avatarSrc: "" },
  { id: "465CS21002", name: "Kiran", Attendence: 90, avatarSrc: "" },
  { id: "465CS21003", name: "Shivan", Attendence: 80, avatarSrc: "" },
];
const sections = ["Section A", "Section B", "Section C", "Section D"];
const batches = ["Batch 1", "Batch 2", "Batch 3"];

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: "Sl.No",
    cell: ({ row }) => <div>{row.index + 1}.</div>,
  },
  {
    accessorKey: "name",
    header: "Student Name",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={row.original.avatarSrc} alt={row.original.name} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div className="">{row.original.name}</div>
          <div className="text-sm text-muted-foreground">{row.original.id}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "attendence",
    header: "Attendence",
    cell: ({ row }) => <div className="pl-4">{row.original.Attendence} %</div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-muted-foreground">
              <Move className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {sections.map((section) => (
              <DropdownMenuSub key={section}>
                <DropdownMenuSubTrigger>{section}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-32">
                  {batches.map((batch) => (
                    <DropdownMenuItem key={`${section}-${batch}`}>
                      {batch}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export function BatchStudentListComponent() {
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
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
    <div className="mx-auto w-full">
      <div className="flex items-center justify-between py-4">
        <div className="relative">
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-96 py-2 pl-10 pr-4"
          />
          <Search className="absolute left-3 top-2 text-gray-400" size={20} />
        </div>
        <StudentInviteDialog>
          <Button>Add Students</Button>
        </StudentInviteDialog>
      </div>

      <Table>
        <TableHeader className="border-none">
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
                className="border-none"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="border-none">
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

export default BatchStudentListComponent;
