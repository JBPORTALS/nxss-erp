"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, MoreVertical, Plus } from "lucide-react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Button } from "@nxss/ui/button";
import { Card, CardContent, CardHeader } from "@nxss/ui/card";
import { Input } from "@nxss/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nxss/ui/table";

const SectionsAndBatchesTable = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      name: "Section A",
      description: "Description for Section A",
      expanded: true,
      batches: [
        {
          id: 1,
          name: "Batch 1",
          students: ["Student 1", "Student 2", "Student 3"],
        },
        {
          id: 2,
          name: "Batch 2",
          students: ["Student 4", "Student 5", "Student 6"],
        },
      ],
    },
    {
      id: 2,
      name: "Section B",
      description: "Description for Section B",
      expanded: false,
      batches: [
        {
          id: 3,
          name: "Batch 1",
          students: ["Student 7", "Student 8", "Student 9"],
        },
      ],
    },
  ]);

  const toggleSection = (sectionId: number) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, expanded: !section.expanded }
          : section,
      ),
    );
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Sections & Batches</h1>
      <p className="mb-6 text-gray-600">
        Student Allocation Across Sections and Batches
      </p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Section / Batch</TableHead>
            <TableHead>Students</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sections.map((section) => (
            <React.Fragment key={section.id}>
              <TableRow className="bg-gray-100">
                <TableCell className="font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection(section.id)}
                  >
                    {section.expanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </Button>
                  {section.name}
                </TableCell>
                <TableCell>{section.description}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={16} />
                  </Button>
                </TableCell>
              </TableRow>
              {section.expanded &&
                section.batches.map((batch) => (
                  <TableRow key={batch.id}>
                    <TableCell className="pl-10">{batch.name}</TableCell>
                    <TableCell>{batch.students.join(", ")}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SectionsAndBatchesTable;
