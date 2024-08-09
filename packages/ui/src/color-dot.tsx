"use client";

import React, { useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@nxss/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@nxss/ui/popover";

import { Button } from "./button";
import { Input } from "./input";
import { HStack } from "./stack";

const colorVariants = [
  { colorClass: "bg-blue-400", name: "Blue" },
  { colorClass: "bg-red-400", name: "Red" },
  { colorClass: "bg-green-400", name: "Green" },
  { colorClass: "bg-yellow-400", name: "Yellow" },
  { colorClass: "bg-purple-400", name: "Purple" },
  { colorClass: "bg-pink-400", name: "Pink" },
  { colorClass: "bg-indigo-400", name: "Indigo" },
  { colorClass: "bg-teal-400", name: "Teal" },
  { colorClass: "bg-orange-400", name: "Orange" },
  { colorClass: "bg-gray-400", name: "Gray" },
];

export function ColorDot({
  number,
  onChange,
  enablePopover = false,
}: {
  number: number;
  onChange?: (newNumber: number) => void;
  enablePopover?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(number);
  const [search, setSearch] = useState("");

  const safeNumber = selectedNumber % colorVariants.length;
  const { colorClass, name } = colorVariants[safeNumber] ?? {
    colorClass: "",
    name: "",
  };

  const filteredColors = colorVariants.filter((color) =>
    color.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleColorSelect = (index: number) => {
    setSelectedNumber(index);
    if (onChange) {
      onChange(index);
    }
    setOpen(false); // Close the popover after selecting the color
  };

  if (!enablePopover) {
    return (
      <div className={`size-6 rounded-full ${colorClass}`} title={name}>
        {number === selectedNumber && (
          <CheckIcon className="absolute right-1 top-1 text-white" />
        )}
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-96 justify-between"
        >
          <HStack className="items-center">
            <div
              className={`size-6 rounded-full ${colorClass} relative`}
              title={name}
            ></div>
            {name}
          </HStack>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0">
        <div className="p-2">
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border p-2"
          />
        </div>
        <Command>
          <CommandList>
            <CommandGroup>
              {filteredColors.length > 0 ? (
                filteredColors.map((color, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => handleColorSelect(index)}
                  >
                    <HStack className="items-center">
                      <div
                        className={`size-6 rounded-full ${color.colorClass} relative`}
                      ></div>
                      <span className="ml-2">{color.name}</span>
                    </HStack>
                    {index === safeNumber && (
                      <CheckIcon className="ml-auto h-4 w-4" />
                    )}
                  </CommandItem>
                ))
              ) : (
                <div className="p-2 text-center text-gray-500">
                  No colors found
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
