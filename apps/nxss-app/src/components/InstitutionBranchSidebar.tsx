"use client";

import React from "react";
import { PlusIcon, RocketIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import { Separator } from "@nxss/ui/seperator";

export default function InstitutionBranchSidebar() {
  return (
    <div className="flex h-screen w-20 flex-col items-center border-r py-4">
      <div>
        {/* Logo Area */}
        <RocketIcon size={32} className="fill-primary text-primary" />
      </div>
      <div className="mt-10 flex flex-col items-center gap-4">
        <Avatar className="size-12 border-2 border-primary p-0.5">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="rounded-full border border-border"
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>

        <Separator className="w-full" />

        <Button
          size={"icon"}
          className="size-12 rounded-full"
          variant={"secondary"}
        >
          <PlusIcon className="size-6" />
        </Button>
        <Avatar asChild>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="size-12 border border-border"
          >
            <AvatarImage src="https://github.com/theo.png" />
            <AvatarFallback>AE</AvatarFallback>
          </Button>
        </Avatar>
      </div>
    </div>
  );
}
