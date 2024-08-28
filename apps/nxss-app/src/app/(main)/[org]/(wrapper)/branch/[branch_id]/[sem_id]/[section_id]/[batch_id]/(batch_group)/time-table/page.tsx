"use client";

import React, { useState } from "react";

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
import { VStack } from "@nxss/ui/stack";

interface Subject {
  id: number;
  name: string;
  time: string;
  instructor: string;
  day: string;
}

interface HistoryItem {
  id: number;
  title: string;
  date: string;
  changedBy: string;
}

const historyData: HistoryItem[] = [
  {
    id: 1,
    title: "IT Skills has been changed to Maths",
    date: "Monday, 12th August",
    changedBy: "Narayana",
  },
  {
    id: 2,
    title: "Maths has been changed to FEEE",
    date: "Tuesday, 12th August",
    changedBy: "Narayana",
  },
];

const allSubjects: Subject[] = [
  {
    id: 1,
    name: "IT Skills",
    time: "9:00 AM - 10:00 AM",
    instructor: "Narayana R",
    day: "Monday",
  },
  {
    id: 2,
    name: "Maths",
    time: "10:00 AM - 11:00 AM",
    instructor: "Manoj",
    day: "Monday",
  },
  {
    id: 3,
    name: "Kannada",
    time: "3:00 PM - 4:00 PM",
    instructor: "Rojarani",
    day: "Monday",
  },
  {
    id: 4,
    name: "PMS",
    time: "11:00 AM - 12:00 PM",
    instructor: "Pratima",
    day: "Tuesday",
  },
  {
    id: 5,
    name: "FSD",
    time: "1:00 PM - 2:00 PM",
    instructor: "Mangala",
    day: "Wednesday",
  },
  {
    id: 6,
    name: "M & A",
    time: "2:00 PM - 3:00 PM",
    instructor: "Jagadeesh",
    day: "Thursday",
  },
  {
    id: 7,
    name: "Kannada",
    time: "3:00 PM - 4:00 PM",
    instructor: "Ramesh",
    day: "Friday",
  },
  // Add more subjects for different days as needed
];

const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [activeTab, setActiveTab] = useState<"Timetable" | "History">(
    "Timetable",
  );

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

  // Function to get a consistent color code based on subject id
  const getColorCode = (id: number) => {
    return id % 8; // This ensures a consistent color for each subject
  };

  return (
    <VStack className="w-full">
      <div className="flex w-fit">
        <Button
          variant={activeTab === "Timetable" ? "switch" : "none"}
          className="min-h-full rounded-e-none text-sm font-medium"
          onClick={() => setActiveTab("Timetable")}
        >
          Timetable
        </Button>
        <Button
          variant={activeTab === "History" ? "switch" : "none"}
          className="min-h-full rounded-s-none text-sm font-medium"
          onClick={() => setActiveTab("History")}
        >
          History
        </Button>
      </div>

      {activeTab === "History" && (
        <div className="grid min-h-fit w-full grid-cols-1 content-center items-center justify-center gap-4 md:grid-cols-2 lg:grid-cols-4">
          {historyData.map((item: HistoryItem) => (
            <div
              key={item.id}
              className="flex h-full items-start gap-2 rounded-lg border p-4"
            >
              <div className="mt-1">
                <ColorDot colorcode={getColorCode(item.id)} />
              </div>
              <div className="flex h-full flex-col gap-1">
                <h3 className="text-sm font-semibold">{item.title}</h3>
                {/* <div className="flex h-full flex-col justify-end gap-1"> */}
                <p className="text-xs text-gray-500">{item.date}</p>
                <p className="text-xs">Changed by {item.changedBy}</p>
                {/* </div> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Timetable" && (
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-fit space-x-2 rounded-lg border p-2">
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
          <div className="flex w-full justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Schedule</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Schedule</DialogTitle>
                  <DialogDescription>
                    Adding the new Schedule in timetable.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <VStack className="">
                    <Label htmlFor="name" className="text-right">
                      Subject Name
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="JAVA">JAVA</SelectItem>
                          <SelectItem value="Python">Python</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="Maths">Maths</SelectItem>
                          <SelectItem value="FOC">FOC</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </VStack>
                  <div className="flex w-full items-center justify-between gap-10">
                    <VStack className="w-full">
                      <Label htmlFor="username" className="text-right">
                        Start time
                      </Label>
                      <Input type="time" className="w-full" />
                    </VStack>
                    <VStack className="w-full">
                      <Label htmlFor="username" className="text-right">
                        End Time
                      </Label>
                      <Input type="time" className="w-full" />
                    </VStack>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex h-full w-full items-center justify-center text-center">
            {filteredSubjects.length > 0 ? (
              <div className="grid w-full grid-cols-1 gap-4 rounded-lg border p-8 md:grid-cols-2 lg:grid-cols-6">
                {filteredSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className={
                      "flex w-full flex-col items-center rounded-lg border p-4 shadow-md"
                    }
                  >
                    <ColorDot colorcode={getColorCode(subject.id)} />
                    <h3 className="mb-1 text-lg font-bold">{subject.name}</h3>
                    <p className="mb-1 text-sm text-gray-600">{subject.time}</p>
                    <p className="text-sm text-gray-600">
                      {subject.instructor}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-20 items-center">
                <span>No Schedule have been set yet.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </VStack>
  );
};

export default Schedule;
