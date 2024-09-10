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
import { Edit, Ellipsis, MoreVertical, Move, Search, UserPlus } from "lucide-react";

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
import { api } from "~/trpc/server"; // Import the Client Component

import { StudentInviteDialog } from "../dailog/student-invite-dialog";

type Branches = {
  name: string;
  description:string;
  staff: number;
  students: number;
};

const data: Branches[] = [
  { name: "Computer Science", description: " CSE", staff: 90, students:100 },
  { name: "Computer Science", description: " CSE", staff: 90, students:100 },
  { name: "Computer Science", description: " CSE", staff: 90, students:100 },
];
const sections = ["Section A", "Section B", "Section C", "Section D"];
const batches = ["Batch 1", "Batch 2", "Batch 3"];

const columns: ColumnDef<Branches>[] = [
  {
    accessorKey: "name",
    header: "Branch Name",
    cell: ({ row }) => <div>{row.original.name}.</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      
          <div className="">{row.original.description}</div>
          
    ),
  },
  {
    accessorKey: "staff",
    header: "Total Staff",
    cell: ({ row }) => <div className="pl-4">{row.original.staff} </div>,
  },
  {
    accessorKey: "students",
    header: "Total Students",
    cell: ({ row }) => <div className="pl-4">{row.original.students} </div>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-muted-foreground">
              <Ellipsis className="size-4" />
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

export default function BranchListComponent() {
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
          <Search className="absolute left-3 top-2 " size={20} />
        </div>
        <StudentInviteDialog>
          <Button>Add Branch</Button>
        </StudentInviteDialog>
      </div>

      <Table className="rounded-lg ">
        <TableHeader className="bg-border">
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
        <TableBody className="">
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
            <TableRow className=" w-full border-b">
              <TableCell colSpan={columns.length} className="h-24 text-center">
              <p>No branches available.</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

