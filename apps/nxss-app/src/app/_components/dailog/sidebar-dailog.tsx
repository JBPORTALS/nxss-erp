import React from "react";
import { Plus } from "lucide-react";

import { Button } from "@nxss/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nxss/ui/dialog";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";

export default function Dailog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus className="pb-1 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Branch</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Branch Name
            </Label>
            <Input
              id="name"
              defaultValue="Computer Science"
              className="w-2/3"
            />
          </div>
          <div className="flex w-full items-center gap-8">
            <Label htmlFor="semester" className="text-right">
              Number of Semester
            </Label>
            <select
              id="semester"
              defaultValue="1" // Set the default selected option here
              className="w-20 bg-secondary/0"
            >
              {/* Option for each semester number */}
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
