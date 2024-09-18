"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";

import { Avatar, AvatarFallback } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import { Separator } from "@nxss/ui/seperator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nxss/ui/table";

const students = [
  {
    id: 1,
    name: "Joe Doe",
    email: "joe@gmail.com",
    rollNumber: "364CS1234",
    phoneNumber: "1234567890",
    avatar: `https://github.identicons.github.com/${encodeURIComponent("joe@gmail.com")}.png`,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@gmail.com",
    rollNumber: "364CS2345",
    phoneNumber: "2345678901",
    avatar: `https://github.identicons.github.com/${encodeURIComponent("jane.smith@gmail.com")}.png`,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@gmail.com",
    rollNumber: "364CS3456",
    phoneNumber: "3456789012",
    avatar: `https://github.identicons.github.com/${encodeURIComponent("mike.j@gmail.com")}.png`,
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily.brown@gmail.com",
    rollNumber: "364CS4567",
    phoneNumber: "4567890123",
    avatar: `https://github.identicons.github.com/${encodeURIComponent("emily.brown@gmail.com")}.png`,
  },
  {
    id: 5,
    name: "Chris Lee",
    email: "chris.lee@gmail.com",
    rollNumber: "364CS5678",
    phoneNumber: "5678901234",
    avatar: `https://github.identicons.github.com/${encodeURIComponent("chris.lee@gmail.com")}.png`,
  },
  {
    id: 6,
    name: "Sarah Wilson",
    email: "sarah.w@gmail.com",
    rollNumber: "364CS6789",
    phoneNumber: "6789012345",
    avatar: `https://github.identicons.github.com/${encodeURIComponent("sarah.w@gmail.com")}.png`,
  },
  {
    id: 7,
    name: "David Taylor",
    email: "david.t@gmail.com",
    rollNumber: "364CS7890",
    phoneNumber: "7890123456",
    avatar: `https://github.identicons.github.com/${encodeURIComponent("david.t@gmail.com")}.png`,
  },
  {
    id: 8,
    name: "Emma Davis",
    email: "emma.d@gmail.com",
    rollNumber: "364CS8901",
    phoneNumber: "8901234567",
    avatar: `https://github.identicons.github.com/${encodeURIComponent("emma.d@gmail.com")}.png`,
  },
  {
    id: 9,
    name: "Alex Martinez",
    email: "alex.m@gmail.com",
    rollNumber: "364CS9012",
    phoneNumber: "9012345678",
    avatar: `https://github.com/"alex.m@gmail.com.png`,
  },
  {
    id: 10,
    name: "Olivia Thompson",
    email: "olivia.t@gmail.com",
    rollNumber: "364CS0123",
    phoneNumber: "0123456789",
    avatar: `https://github.identicons.github.com/${encodeURIComponent("olivia.t@gmail.com")}.png`,
  },
];

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

  // Function to generate a consistent color based on the name
  const getAvatarColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  return (
    <ContentArea>
      <ContentAreaHeader>
        <ContentAreaTitle>Profiles</ContentAreaTitle>
        <ContentAreaDescription>
          All Students in computer Science
        </ContentAreaDescription>
      </ContentAreaHeader>
      <Separator />
      <ContentAreaContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Roll Number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="flex h-full items-center gap-2">
                  <Avatar className="size-8 bg-transparent">
                    <AvatarFallback
                      style={{ background: getAvatarColor(student.name) }}
                      className="text-background"
                    >
                      {student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {student.name}
                </TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phoneNumber}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ContentAreaContainer>
    </ContentArea>
  );
};

export default SectionsAndBatchesTable;
