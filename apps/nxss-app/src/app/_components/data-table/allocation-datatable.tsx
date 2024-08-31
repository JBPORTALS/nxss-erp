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
import { EllipsisIcon, Search, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
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
import { HStack, VStack } from "@nxss/ui/stack";
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
  at: string;
  avatarSrc: string;
};

const data: Student[] = [
  {
    id: "465CS21001",
    name: "Narayan R",
    at: "Allocated two days ago",
    avatarSrc: "",
  },
  { id: "465CS21002", name: "Kiran", at: "Allocated just now", avatarSrc: "" },
  {
    id: "465CS21003",
    name: "Shivan",
    at: "Allocated two days ago",
    avatarSrc: "",
  },
];

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: "Sl.No",
    cell: ({ row }) => <div>{row.index + 1}.</div>,
  },
  {
    accessorKey: "name",
    header: (props) => <div className="pl-4">Allocated To</div>,
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
    accessorKey: "Allocated_At",
    header: (props) => <div className="pl-4">Allocated At</div>,
    cell: ({ row }) => <div>{row.original.at}</div>,
  },
  {
    id: "actions",
    cell: () => (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <EllipsisIcon />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-destructive">
              <X className="mr-2" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export function AllocationsListComponent() {
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
    <VStack className="mx-auto w-full">
      <div className="relative">
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-96 py-2 pl-10 pr-4"
        />
        <Search className="absolute left-3 top-2 text-gray-400" size={20} />
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
    </VStack>
  );
}

export default AllocationsListComponent;
