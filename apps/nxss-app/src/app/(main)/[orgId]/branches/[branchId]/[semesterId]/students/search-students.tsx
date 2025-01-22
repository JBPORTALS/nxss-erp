"use client";

import React from "react";
import {
  CheckIcon,
  PlusCircleIcon,
  SearchIcon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import { parseAsString, parseAsStringEnum, useQueryState } from "nuqs";

import { Badge } from "@nxss/ui/badge";
import { Button } from "@nxss/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@nxss/ui/command";
import { Input } from "@nxss/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@nxss/ui/popover";
import { Separator } from "@nxss/ui/seperator";

export default function SearchStudents() {
  const [query, setQuery] = useQueryState("q", parseAsString);
  const [status, setStatus] = useQueryState(
    "status",
    parseAsStringEnum(["active", "inactive"]),
  );

  return (
    <div className="flex w-full gap-3">
      <div className="relative flex w-1/2 items-center">
        <SearchIcon className="absolute ml-2.5 mr-2.5 size-4 text-muted-foreground" />
        <Input
          value={query ?? ""}
          onChange={(e) =>
            setQuery(e.target.value.length > 0 ? e.target.value : null, {
              clearOnDefault: true,
            })
          }
          placeholder="Search..."
          className="h-9 w-full pe-9 ps-9"
        />
        {query && (
          <Button
            onClick={() => setQuery(null, { clearOnDefault: true })}
            size={"icon"}
            className="absolute right-0 ml-2.5 mr-2.5 size-5"
            variant={"ghost"}
          >
            <XIcon className="size-3" />
          </Button>
        )}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className="border-dashed">
            <PlusCircleIcon className="size-4" /> Status{" "}
            {status ? (
              <React.Fragment>
                <Separator orientation="vertical" />
                <Badge variant={"secondary"} className="capitalize">
                  {status}
                </Badge>
              </React.Fragment>
            ) : null}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[170px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={(value) =>
                    setStatus(value, { clearOnDefault: true })
                  }
                  value="active"
                  className="flex items-center gap-2"
                >
                  <SquareIcon className="fill-success text-success size-4" />
                  Active
                  {status === "active" && (
                    <CheckIcon className="ml-auto size-4" />
                  )}
                </CommandItem>
                <CommandItem
                  onSelect={(value) =>
                    setStatus(value, { clearOnDefault: true })
                  }
                  value="inactive"
                  className="flex items-center gap-2"
                >
                  <SquareIcon className="fill-warning text-warning size-4" />
                  Inactive{" "}
                  {status === "inactive" && (
                    <CheckIcon className="ml-auto size-4" />
                  )}
                </CommandItem>
              </CommandGroup>
              {status && (
                <React.Fragment>
                  <CommandSeparator />
                  <CommandGroup>
                    <Button
                      onClick={() => setStatus(null, { clearOnDefault: true })}
                      size={"sm"}
                      className="w-full"
                      variant={"ghost"}
                    >
                      Clear filters
                    </Button>
                  </CommandGroup>
                </React.Fragment>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
