"use client";

import React, { useState } from "react";
import { Edit, Search } from "lucide-react";

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

const studentsData = [
  {
    id: "465CS21001",
    name: "Olivia Rhye",
    avatarSrc: "/api/placeholder/32",
    totalWrittenTest: 100,
    writtenTestAvg: 50,
    result: "Pass",
  },
  // Add more student data here...
];

export default function StudentTestTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="relative">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 pl-10"
          />
          <Search className="absolute left-3 top-2 text-gray-400" size={20} />
        </div>
        <Button variant="outline">Add Column</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sl No</TableHead>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Total Written test (90)</TableHead>
            <TableHead>Written test (AVG) (60)</TableHead>
            <TableHead>Results Pass/Fail</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={student.avatarSrc} alt={student.name} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{student.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {student.id}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{student.totalWrittenTest}</TableCell>
              <TableCell>{student.writtenTestAvg}</TableCell>
              <TableCell>{student.result}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
