"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, MoreVertical } from "lucide-react";

import { Button } from "@nxss/ui/button";
import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
  ContentSubHeader,
} from "@nxss/ui/content-area";
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
      description: "-",
      expanded: true,
      totalStudents: 6,
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
      description: "-",
      expanded: false,
      totalStudents: 3,
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
    <ContentArea>
      <ContentAreaHeader>
        <ContentAreaTitle>Profiles</ContentAreaTitle>
        <ContentAreaDescription>
          All Students in computer Science
        </ContentAreaDescription>
      </ContentAreaHeader>
      <ContentAreaContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Section / Batch</TableHead>
              <TableHead></TableHead>
              <TableHead className="text-center">Total Students</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sections.map((section) => (
              <React.Fragment key={section.id}>
                <TableRow className="bg-accent/50">
                  <TableCell className="flex items-center gap-2 font-medium">
                    <Button
                      variant="ghost"
                      size="icon"
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
                  <TableCell className="text-center">
                    {section.totalStudents}
                  </TableCell>
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
                      <TableCell className="text-center">
                        {batch.students.length}
                      </TableCell>
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
      </ContentAreaContainer>
    </ContentArea>
  );
};

export default SectionsAndBatchesTable;
