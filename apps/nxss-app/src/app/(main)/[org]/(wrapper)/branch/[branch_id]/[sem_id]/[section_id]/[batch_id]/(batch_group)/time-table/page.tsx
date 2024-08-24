"use client";

import React, { useState } from "react";
import { Button } from "@nxss/ui/button";
import { ColorDot } from "@nxss/ui/color-dot";

interface Subject {
  id: number;
  name: string;
  time: string;
  instructor: string;
  day: string;
}

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
    return id % 7; // This ensures a consistent color for each subject
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between">
        <div className="flex space-x-2">
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
        <button className="rounded bg-gray-800 px-4 py-2 text-white">
          Add Subject
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 justify-center items-center content-center w-full">
        {filteredSubjects.map((subject) => (
          <div key={subject.id} className={"w-full rounded-lg p-4 shadow-md"}>
            <ColorDot colorcode={getColorCode(subject.id)} />
            <h3 className="mb-1 text-lg font-bold">{subject.name}</h3>
            <p className="mb-1 text-sm text-gray-600">{subject.time}</p>
            <p className="text-sm text-gray-600">{subject.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;