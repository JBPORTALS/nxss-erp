"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Check, ChevronsUpDown, DotIcon, PlusCircle } from "lucide-react";

import { RouterOutputs } from "@nxss/api";
import { cn } from "@nxss/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Badge } from "@nxss/ui/badge";
import { Button } from "@nxss/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@nxss/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@nxss/ui/popover";

import { api } from "~/trpc/react";

export const SemesterSwitcher = () => {
  const params = useParams();
  const { data, isLoading } = api.semester.getSemesterList.useQuery({
    branchId: parseInt(params.branch_id as string),
  });
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  if (isLoading) {
    return null;
  }

  const semesters = data ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          size={"sm"}
          className="w-fit justify-between"
        >
          {params?.semester_id ? (
            <div className="flex items-center gap-0">
              <span className="w-full truncate">
                Semester{" "}
                {
                  semesters.find(
                    (sem) => sem.id === parseInt(params.semester_id as string),
                  )?.number
                }
              </span>
              <DotIcon className="size-12" />
            </div>
          ) : (
            "Select organization..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="pointer-events-auto w-[180px] p-0"
      >
        <Command value={params.semester_id as string}>
          <CommandInput placeholder="Search organization..." />
          <CommandList>
            <CommandEmpty>No semester found.</CommandEmpty>
            <CommandGroup>
              {semesters.map((sem) => (
                <CommandItem
                  key={sem.id}
                  value={sem.id.toString()}
                  onSelect={() => {
                    router.push(
                      `/${params.org}/branches/${sem.branch_id}/s/${sem.id}`,
                    );
                  }}
                  asChild
                >
                  <Button
                    variant={"ghost"}
                    className="flex w-full justify-between truncate text-xs font-normal"
                  >
                    <div className="flex items-center gap-2">
                      Semester {sem.number}
                      <DotIcon />
                    </div>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        parseInt(params.semester_id as string) === sem.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </Button>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SemesterSwitcher;
