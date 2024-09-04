"use client";

// This directive ensures the component is treated as a Client Component
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@nxss/ui/input";
import { HStack } from "@nxss/ui/stack";

import CreateBranchDailog from "~/app/_components/dailog/create-branch-dailog";

export function BranchSearch({
  initialSearchTerm,
}: {
  initialSearchTerm: string;
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const queryParams = new URLSearchParams(window.location.search);
    if (value) {
      queryParams.set("searchTerm", value);
    } else {
      queryParams.delete("searchTerm");
    }

    // Push the new URL with the updated query parameter
    router.push(`?${queryParams.toString()}`, undefined, { shallow: true });
  };

  return (
    <HStack className="mb-5 w-full justify-between">
      <Input
        className="w-1/2"
        placeholder="Search by branch name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <CreateBranchDailog />
    </HStack>
  );
}
