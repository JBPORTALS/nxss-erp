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
import { FileText, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
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
  totalFee: number;
  feePaid: number;
  balance: number;
  status: "pending" | "partial" | "paid";
  avatarSrc: string;
};

const data: Student[] = [
  {
    id: "465CS21006",
    name: "Kethan",
    totalFee: 120300,
    feePaid: 120300,
    balance: 120300,
    status: "pending",
    avatarSrc: "",
  },
  {
    id: "465CS21007",
    name: "Charan",
    totalFee: 120300,
    feePaid: 120300,
    balance: 120300,
    status: "paid",
    avatarSrc: "",
  },
  {
    id: "465CS21009",
    name: "Kumar",
    totalFee: 120300,
    feePaid: 120300,
    balance: 120300,
    status: "partial",
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
    header: "Student Profile",
    cell: ({ row }) => (
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={row.original.avatarSrc} alt={row.original.name} />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-sm text-muted-foreground">{row.original.id}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "totalFee",
    header: "Total fee",
    cell: ({ row }) => (
      <div>₹ {row.original.totalFee.toLocaleString("en-IN")}</div>
    ),
  },
  {
    accessorKey: "feePaid",
    header: "Fee paid",
    cell: ({ row }) => (
      <div>₹ {row.original.feePaid.toLocaleString("en-IN")}</div>
    ),
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => (
      <div>₹ {row.original.balance.toLocaleString("en-IN")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className={`size-4 rounded-full ${
            row.original.status === "paid"
              ? "bg-green-500"
              : row.original.status === "partial"
                ? "bg-red-500"
                : "bg-yellow-500"
          }`}
        ></div>
      </div>
    ),
  },
  {
    id: "history",
    header: "History",
    cell: () => (
      <Button variant="ghost" size="sm">
        <FileText className="h-4 w-4" />
      </Button>
    ),
  },
];

export function StudentFeeListComponent() {
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
    <div className="w-full">
      <div className="mb-4">
        <div className="relative">
          <Input
            placeholder="Search by name or register number..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full max-w-sm py-2 pl-10 pr-4"
          />
          <Search className="absolute left-3 top-2 text-gray-400" size={20} />
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="font-medium text-gray-500"
                >
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

export default StudentFeeListComponent;
