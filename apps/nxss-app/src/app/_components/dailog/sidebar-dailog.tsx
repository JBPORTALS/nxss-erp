import React from "react";
import { Plus } from "lucide-react";

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
import { Textarea } from "@nxss/ui/textarea";

export default function Dailog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Plus className="pb-1 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Branch</DialogTitle>
          <DialogDescription className="text-xs">
            Creating a new, separate pathway within the project's repository to
            isolate changes and developments.
          </DialogDescription>
        </DialogHeader>

        <Label>Branch Name</Label>
        <Input placeholder="Branch name"/>
        <Label>Branch description</Label>
        <Textarea placeholder="Description"/>
        <p className="text-sm">Optional</p>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
