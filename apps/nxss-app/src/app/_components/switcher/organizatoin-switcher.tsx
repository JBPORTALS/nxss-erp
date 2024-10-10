"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

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

export const CustomOrganizationSwitcher = () => {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: { infinite: true },
  });
  const { organization } = useOrganization();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (isLoaded && params.org) {
      const org = userMemberships.data.find(
        (mem) => mem.organization.slug === params.org,
      );
      if (org) {
        setActive({ organization: org.organization.id });
      }
    }
  }, [isLoaded, params.org, userMemberships.data]);

  if (!isLoaded) {
    return null;
  }

  const organizations = userMemberships?.data ?? [];

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
          {organization?.id ? (
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={organization?.imageUrl} />
              </Avatar>
              <span className="w-full truncate">
                {
                  organizations.find(
                    (mem) => mem.organization.id === organization.id,
                  )?.organization.name
                }
              </span>
              {organizations.find(
                (mem) => mem.organization.id === organization.id,
              )?.role === "org:staff" ? (
                <Badge variant={"secondary"} className="text-xs">
                  Staff
                </Badge>
              ) : (
                <Badge variant={"secondary"} className="text-xs">
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
        <Command value={organization?.id}>
          <CommandInput placeholder="Search organization..." />
          <CommandList>
            <CommandEmpty>No organization found.</CommandEmpty>
            <CommandGroup>
              {organizations
                .filter((org) => org.role === "org:admin")
                .map((mem) => (
                  <CommandItem
                    key={mem.organization.id}
                    value={mem.organization.id}
                    onSelect={() => {
                      router.push(`/${mem.organization.slug}/dashboard`);
                    }}
                    asChild
                  >
                    <Button
                      variant={"ghost"}
                      className="flex w-full justify-between truncate text-xs font-normal"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarImage src={mem.organization.imageUrl} />
                        </Avatar>
                        {mem.organization.name}
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
                          organization?.id === mem.organization.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </Button>
                  </CommandItem>
                ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              {organizations
                .filter((org) => org.role === "org:staff")
                .map((mem) => (
                  <CommandItem
                    key={mem.organization.id}
                    value={mem.organization.id}
                    onSelect={() => {
                      router.push(`/${mem.organization.slug}/dashboard`);
                    }}
                    asChild
                  >
                    <Button
                      variant={"ghost"}
                      className="flex w-full justify-between truncate text-xs font-normal"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarImage src={mem.organization.imageUrl} />
                        </Avatar>
                        {mem.organization.name}
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
                          organization?.id === mem.organization.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </Button>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
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
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomOrganizationSwitcher;
