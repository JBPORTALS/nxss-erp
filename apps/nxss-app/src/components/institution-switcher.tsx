"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@nxss/ui";
import { Avatar, AvatarImage } from "@nxss/ui/avatar";
import { Badge } from "@nxss/ui/badge";
import { Button } from "@nxss/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@nxss/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@nxss/ui/popover";
import { Skeleton } from "@nxss/ui/skeleton";

export const InstitutionSwitcher = () => {
  const { isLoaded, userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  });
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = React.useState(false);

  if (!isLoaded) {
    return <Skeleton className="h-9 w-full" />;
  }

  const organizations = userMemberships?.data ?? [];

  const orgItem = organizations.find(
    (item) => item.organization.id === params.orgId,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-input"
        >
          {params.orgId ? (
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={orgItem?.organization?.imageUrl} />
              </Avatar>
              <span className="w-full truncate">
                {orgItem?.organization?.name}
              </span>
              {orgItem?.role === "org:staff" ? (
                <Badge variant={"secondary"} className="px-1 py-1 text-xs">
                  Staff
                </Badge>
              ) : (
                <Badge
                  variant={"secondary"}
                  className="px-1.5 py-0 font-mono text-xs font-normal"
                >
                  Free
                </Badge>
              )}
            </div>
          ) : (
            "Select organization..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="pointer-events-auto w-[280px] p-0"
      >
        <Command value={params.orgId}>
          <CommandInput placeholder="Search organization..." />
          <CommandList>
            <CommandEmpty>No organization found.</CommandEmpty>
            <CommandGroup>
              {organizations
                .filter((org) => org.role === "org:admin")
                .map((item) => (
                  <CommandItem
                    key={item.organization.id}
                    value={item.organization.id}
                    onSelect={() => {
                      router.push(`/${item.organization.id}/dashboard`);
                    }}
                    asChild
                  >
                    <Button
                      variant={"ghost"}
                      className="flex w-full justify-between truncate text-xs font-normal"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarImage src={item.organization.imageUrl} />
                        </Avatar>
                        {item.organization.name}
                        <Badge
                          variant={"secondary"}
                          className="text-xs font-normal"
                        >
                          Free
                        </Badge>
                      </div>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          params.orgId === item.organization.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </Button>
                  </CommandItem>
                ))}
            </CommandGroup>
            {/* <CommandSeparator />
            <CommandGroup>
              {organizations
                .filter((org) => org.role === "org:staff")
                .map((item) => (
                  <CommandItem
                    key={item.organization.id}
                    value={item.organization.id}
                    onSelect={() => {
                      router.push(`/${item.organization.slug}/dashboard`);
                    }}
                    asChild
                  >
                    <Button
                      variant={"ghost"}
                      className="flex w-full justify-between truncate text-xs font-normal"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarImage src={item.organization.imageUrl} />
                        </Avatar>
                        {item.organization.name}
                        <Badge
                          variant={"secondary"}
                          className="text-xs font-normal"
                        >
                          Staff
                        </Badge>
                      </div>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          organization?.id === item.organization.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </Button>
                  </CommandItem>
                ))}
            </CommandGroup> */}
          </CommandList>
          {/* <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                router.push(`/create-organization`);
              }}
              asChild
            >
              <Button variant={"ghost"} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Organization
              </Button>
            </CommandItem>
          </CommandGroup> */}
        </Command>
      </PopoverContent>
    </Popover>
  );
};
