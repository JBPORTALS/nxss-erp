"use client";

import React, { useState } from "react";
import { Plus, Scroll, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
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
import { ScrollArea } from "@nxss/ui/scrollarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nxss/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@nxss/ui/sheet";
import { HStack, VStack } from "@nxss/ui/stack";

const cardsData = [
  {
    id: 1,
    title: "IT Skills",
    code: "20CS21T",
    date: "Tuesday, 16th August",
    time: "9:00 AM - 12:00 PM",
    sections: "All",
    batch: "1",
    uploadedDate: "Jan 20, 2024",
    avatarSrc: "https://github.com/shadcn.png",
    avatarFallback: "CN",
    colorCode: 1,
  },
  {
    id: 2,
    title: "Mathematics",
    code: "20MA31T",
    date: "Wednesday, 17th August",
    time: "10:00 AM - 11:30 AM",
    sections: "A",
    batch: "2",
    uploadedDate: "Jan 21, 2024",
    avatarSrc: "https://github.com/vercel.png",
    avatarFallback: "VC",
    colorCode: 2,
  },
  {
    id: 3,
    title: "Physics",
    code: "20PH41T",
    date: "Thursday, 18th August",
    time: "11:00 AM - 1:00 PM",
    sections: "B",
    batch: "3",
    uploadedDate: "Jan 22, 2024",
    avatarSrc: "https://github.com/facebook.png",
    avatarFallback: "FB",
    colorCode: 3,
  },
];

export default function page() {
  const [cards, setCards] = useState([{}]);

  const handleAddClick = () => {
    setCards([...cards, {}]);
  };

  const handleRemoveClick = (indexToRemove: any) => {
    setCards(cards.filter((_, index) => index !== indexToRemove));
  };

  return (
    <VStack className="gap-8">
      <div>
        <h1 className="text-2xl font-bold">Exam Schedule</h1>
        <span className="text-muted-foreground">
          Detailed Examination Schedule for All Subjects
        </span>
      </div>
      <HStack className="w-full justify-between">
        <HStack className="w-1/2">
          <Input placeholder="Search..." className="w-full" />
          <HStack className="w-full">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Test Type " />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Theory">Theory</SelectItem>
                  <SelectItem value="Pratical">Pratical</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Test Name" />
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
          </HStack>
        </HStack>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add Schedule</Button>
          </SheetTrigger>

          <SheetContent className="space-y-4 sm:max-w-[425px]">
            <SheetHeader>
              <SheetTitle>Add Schedule</SheetTitle>
            </SheetHeader>
            <HStack className="w-full items-center justify-between gap-10">
              <VStack className="w-full">
                <Label htmlFor="username" className="text-right">
                  Select Section
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                  <SelectContent className="p-2 text-base">
                    <SelectItem value="Section A">Section A</SelectItem>
                    <SelectItem value="Section B">Section B</SelectItem>
                    <SelectItem value="Section C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </VStack>
              <VStack className="w-full">
                <Label htmlFor="username" className="text-right">
                  Select Batch
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent className="p-2 text-base">
                    <SelectItem value="Batch 1">Batch 1</SelectItem>
                    <SelectItem value="Batch 2">Batch 2</SelectItem>
                    <SelectItem value="Batch 3">Batch 3</SelectItem>
                  </SelectContent>
                </Select>
              </VStack>
            </HStack>
            <ScrollArea className="mt-4 h-[450px] border-t">
              {cards.map((_, index) => (
                <VStack>
                  <Card key={index} className="mt-4">
                    <div className="flex w-full justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveClick(index)}
                      >
                        <X />
                      </Button>
                    </div>
                    <CardContent>
                      <div className="grid gap-4 py-4">
                        <VStack>
                          <Label>Subject Name</Label>
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
                            <Label>Passing Marks</Label>
                            <Input type="number" placeholder="Enter" />
                          </VStack>
                          <VStack className="w-full">
                            <Label>Maximum Marks</Label>
                            <Input type="number" placeholder="Enter" />
                          </VStack>
                        </div>
                        <VStack className="w-full">
                          <Label>Date</Label>
                          <Input type="date" className="w-full" />
                        </VStack>
                        <div className="flex w-full items-center justify-between gap-10">
                          <VStack className="w-full">
                            <Label>Start Time</Label>
                            <Input type="time" className="w-full" />
                          </VStack>
                          <VStack className="w-full">
                            <Label>End Time</Label>
                            <Input type="time" className="w-full" />
                          </VStack>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </VStack>
              ))}
            </ScrollArea>

            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={handleAddClick}
              className="w-full"
            >
              <Plus /> Add
            </Button>

            <DialogFooter>
              <Button type="submit">Add Schedule</Button>
            </DialogFooter>
          </SheetContent>
        </Sheet>
      </HStack>
      <div className="grid w-full grid-cols-5">
        {cardsData.map((card) => (
          <Card className="w-[212px]" key={card.id}>
            <CardHeader className="flex w-full items-center border-b p-2">
              <HStack className="w-full items-center px-3">
                <ColorDot colorcode={card.colorCode} className="size-8" />
                <VStack className="gap-0">
                  <h1 className="">{card.title}</h1>
                  <span className="truncate text-sm font-normal text-muted-foreground">
                    {card.code}
                  </span>
                </VStack>
              </HStack>
            </CardHeader>
            <CardContent className="flex">
              <VStack className="justify-center gap-1 pt-3">
                <h1 className="text-xs">{card.date}</h1>
                <span className="text-xs">{card.time}</span>
                <p className="truncate text-sm font-normal text-muted-foreground">
                  Sections{" "}
                  <span className="text-foreground">{card.sections}</span>
                </p>
                <p className="truncate text-sm font-normal text-muted-foreground">
                  Batch <span className="text-foreground">{card.batch}</span>
                </p>
              </VStack>
            </CardContent>
            <CardFooter className="flex h-10 w-full justify-center space-x-2 border-t p-2 px-2">
              <Avatar className="size-5">
                <AvatarImage src={card.avatarSrc} alt={card.avatarFallback} />
                <AvatarFallback>{card.avatarFallback}</AvatarFallback>
              </Avatar>
              <span className="w-full text-xs text-muted-foreground">
                You Uploaded <span className="">•</span> {card.uploadedDate}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </VStack>
  );
}
