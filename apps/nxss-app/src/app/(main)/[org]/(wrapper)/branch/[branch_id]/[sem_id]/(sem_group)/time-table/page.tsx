"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";

import { Button } from "@nxss/ui/button";
import { ColorDot } from "@nxss/ui/color-dot";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nxss/ui/dialog";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@nxss/ui/select";
import { HStack, VStack } from "@nxss/ui/stack";

interface Subject {
  colorcode: number;
  name: string;
  time: string;
  instructor: string;
  day: string;
}

const allSubjects: Subject[] = [
  {
    colorcode: 1,
    name: "IT Skills",
    time: "9:00 AM - 10:00 AM",
    instructor: "Narayana R",
    day: "Monday",
  },
  {
    colorcode: 2,
    name: "Maths",
    time: "10:00 AM - 11:00 AM",
    instructor: "Manoj",
    day: "Monday",
  },
  {
    colorcode: 3,
    name: "Kannada",
    time: "3:00 PM - 4:00 PM",
    instructor: "Rojarani",
    day: "Monday",
  },
  {
    colorcode: 4,
    name: "PMS",
    time: "11:00 AM - 12:00 PM",
    instructor: "Pratima",
    day: "Tuesday",
  },
  {
    colorcode: 5,
    name: "FSD",
    time: "1:00 PM - 2:00 PM",
    instructor: "Mangala",
    day: "Wednesday",
  },
  {
    colorcode: 6,
    name: "M & A",
    time: "2:00 PM - 3:00 PM",
    instructor: "Jagadeesh",
    day: "Thursday",
  },
  {
    colorcode: 9,
    name: "Kannada",
    time: "3:00 PM - 4:00 PM",
    instructor: "Ramesh",
    day: "Friday",
  },
  // Add more subjects for different days as needed
];

const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const filteredSubjects = allSubjects.filter(
    (subject) => subject.day === selectedDay,
  );

  // Function to get a consistent color code based on subject colorcode
  const getColorCode = (colorcode: number) => {
    return colorcode; // This ensures a consistent color for each subject  colorcode  contain 10 color
  };

  return (
    <div className="container mx-auto space-y-3 p-0">
      <HStack className="flex w-full justify-end">
        <Button variant={"outline"}>
          Download <Download className="size-4 text-foreground" />
        </Button>
      </HStack>

      <div className="mb-4 flex justify-between">
        <div className="flex items-center space-x-2 rounded-lg border p-2">
          {days.map((day) => (
            <Button
              key={day}
              variant={selectedDay === day ? "primary" : "ghost"}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </Button>
          ))}
        </div>
      </div>
      <HStack className="flex w-full justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"lg"}>Add Subject</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Subject</DialogTitle>
              <DialogDescription>
                Adding the new subject in timetable.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <VStack>
                <Label>Subject Name</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </VStack>
              <HStack className="w-full">
                <VStack className="w-full">
                  <Label>Start time</Label>
                  <Input type="time" className="w-fit" />
                </VStack>
                <VStack className="w-full">
                  <Label>End Time</Label>
                  <Input type="time" className="w-fit" />
                </VStack>
              </HStack>
            </div>
            <DialogFooter>
              <Button type="submit">Add Subject</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </HStack>

      <div className="grid min-h-60 grid-cols-2 grid-rows-2 gap-4 rounded-lg border p-5 md:grid-cols-4 lg:grid-cols-6">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.colorcode}
            className={`flex w-full flex-col items-center rounded-lg border p-4 shadow-md`}
          >
            <ColorDot colorcode={getColorCode(subject.colorcode)} />
            <h3 className="mb-1 mt-2 text-lg font-bold">{subject.name}</h3>
            <p className="mb-1 text-sm text-gray-600">{subject.time}</p>
            <p className="text-sm text-gray-600">{subject.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
