"use client";

import { useParams, usePathname } from "next/navigation";

import { Button } from "@nxss/ui/button";
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

export default function Template({ params, children }: any) {
  const pathname = usePathname();

  const { org, branch_id, sem_id, subject_id, type_id, test_id } = useParams();
  return (
    <div className="flex flex-col gap-2">
      <HStack className="w-full justify-between">
        <VStack className="gap-2">
          <h1 className="text-2xl font-bold">Marks</h1>
          <span className="text-muted-foreground">
            Test Guidelines and Requirements.
          </span>
        </VStack>
        {pathname.startsWith(
          `/${org}/branch/${branch_id}/${sem_id}/subject/${subject_id}/test/${type_id}/${test_id}`,
        ) && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Start New Test</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Start New Test</DialogTitle>
              </DialogHeader>
              <VStack className="w-full">
                <div className="w-full">
                  <Label htmlFor="username" className="text-right">
                    Test Name
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Written Test 1">
                          Written Test 1
                        </SelectItem>
                        <SelectItem value="Written Test 1">
                          Written Test 1
                        </SelectItem>
                        <SelectItem value="Written Test 1">
                          Written Test 1
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <HStack className="w-full">
                  <div>
                    <Label htmlFor="name" className="text-right">
                      Maximum Marks
                    </Label>
                    <Input id="name" placeholder="Enter..." />
                  </div>
                  <div>
                    <Label htmlFor="username" className="text-right">
                      Passing Marks
                    </Label>
                    <Input id="username" placeholder="Enter..." />
                  </div>
                </HStack>
                <div className="w-full">
                  <Label htmlFor="time" className="text-right">
                    Time Slot
                  </Label>
                  <Input id="time" type="time" />
                </div>
              </VStack>
              <DialogFooter>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </HStack>
      <section className="w-full">{children}</section>
    </div>
  );
}
