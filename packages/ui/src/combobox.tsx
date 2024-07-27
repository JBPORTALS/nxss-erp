"use client";

import React, { useState } from "react";
import { AvatarIcon } from "@radix-ui/react-icons";

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

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export function ComboboxDemo() {
  const [selected, setSelected] = useState<string | null>(null);

  const items = [
    { email: null, src: null }, // Default "No Assign" item
    { email: "Akashakashbr41@gmail.com", src: "https://github.com/shadcn.png" },
    { email: "Rsharshitha@gmail.com", src: "https://github.com/shadcn.png" },
    { email: "Likitha2008@gmail.com", src: "https://github.com/shadcn.png" },
    { email: "kushal@gmail.com", src: "" },
  ];

  const handleSelect = (email: string | null) => {
    setSelected(email);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-3 hover:cursor-pointer">
            {selected ? (
              selected === null ? (
                <>
                  <AvatarIcon height={30} width={40} />
                  No Assign
                </>
              ) : (
                <>
                  <Avatar>
                    <AvatarImage
                      src={
                        items.find((item) => item.email === selected)?.src ||
                        undefined
                      }
                      alt={selected || ""}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span>{selected}</span>
                </>
              )
            ) : (
              <>
                <AvatarIcon height={30} width={40} />
                No Assign
              </>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Staffs">
                {items.map((item, index) => (
                  <CommandItem
                    key={index}
                    className="cursor-pointer gap-3"
                    onSelect={() => handleSelect(item.email)}
                  >
                    {item.email === null ? (
                      <>
                        <AvatarIcon height={30} width={40} />
                        No Assign
                      </>
                    ) : (
                      <>
                        <Avatar>
                          <AvatarImage src={item.src} alt={item.email} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>{item.email}</span>
                      </>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
