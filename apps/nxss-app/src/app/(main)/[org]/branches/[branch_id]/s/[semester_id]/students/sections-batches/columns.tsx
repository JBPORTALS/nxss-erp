"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  MoreVertical,
} from "lucide-react";

import { SectionWithBatches } from "@nxss/api";
import { Button } from "@nxss/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@nxss/ui/dropdown-menu";

export const useColumns = () => {
  const columns: ColumnDef<SectionWithBatches>[] = [
    {
      id: "expander",
      header: () => null,
      cell: ({ row }) => {
        return (
          <div className="w-1">
            <Button
              variant="ghost"
              onClick={row.getToggleExpandedHandler()}
              disabled={!row.getCanExpand()}
              className="h-8 w-8 p-0"
            >
              {row.getIsExpanded() ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "section_name",
      header: "Section / Batch",
      cell(props) {
        return `Section ${props.row.original.section_name}`;
      },
    },
    {
      accessorKey: "total_students",
      header: "Total Students",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit Section</DropdownMenuItem>
              <DropdownMenuItem>Delete Section</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
