"use client";

import React from "react";
import { SearchIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";

import { Input } from "@nxss/ui/input";

export default function SearchStudents() {
  const [query, setQuery] = useQueryState("q", parseAsString);

  return (
    <div className="flex w-full gap-3">
      <div className="relative flex w-full items-center">
        <SearchIcon className="absolute ml-2.5 mr-2.5 size-4 text-muted-foreground" />
        <Input
          value={query ?? ""}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ..."
          className="h-9 w-full ps-9"
        />
      </div>
    </div>
  );
}
