"use client";

import { useEffect } from "react";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { cn } from "@nxss/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nxss/ui/select";

export const CustomOrganizationSwitcher = () => {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const { isLoaded: isOrgLoaded, organization } = useOrganization();

  if (!isLoaded || !isOrgLoaded) {
    return <p>Loading</p>;
  }

  if (!organization) {
    return <p>Loading...</p>;
  }

  return (
    <Select
      value={organization.id}
      onValueChange={(OrgId) => {
        setActive({ organization: OrgId });
      }}
      disabled
    >
      <SelectTrigger
        className={cn(
          "w-fit border-none px-2 text-base font-semibold shadow-none outline-none hover:bg-accent disabled:hover:bg-transparent",
        )}
      >
        <SelectValue placeholder="Select Organization" />
      </SelectTrigger>
      <SelectContent>
        {userMemberships.data?.map((mem) => (
          <SelectItem value={mem.organization.id} key={mem.id}>
            {mem.organization.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
