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
  { colorcode: 1, colorValue: "#60a5fa", name: "Blue" },
  { colorcode: 2, colorValue: "#f87171", name: "Red" },
  { colorcode: 3, colorValue: "#34d399", name: "Green" },
  { colorcode: 4, colorValue: "#facc15", name: "Yellow" },
  { colorcode: 5, colorValue: "#c084fc", name: "Purple" },
  { colorcode: 6, colorValue: "#f472b6", name: "Pink" },
  { colorcode: 7, colorValue: "#818cf8", name: "Indigo" },
  { colorcode: 8, colorValue: "#14b8a6", name: "Teal" },
  { colorcode: 9, colorValue: "#fb923c", name: "Orange" },
  { colorcode: 10, colorValue: "#9ca3af", name: "Gray" },
];

export function ColorDot({
  colorcode,
  onChange,
  enablePopover = false,
}: {
  colorcode: number;
  onChange?: (newId: number) => void;
  enablePopover?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(colorcode);
  const [search, setSearch] = useState("");

  const selectedColor = colorVariants.find(
    (color) => color.colorcode === selectedId,
  ) || { colorValue: "#000", name: "" };
  const { colorValue, name } = selectedColor;

  const filteredColors = colorVariants.filter((color) =>
    color.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleColorSelect = (newId: number) => {
    setSelectedId(newId);
    if (onChange) {
      onChange(newId);
    }
    setOpen(false);
  };

  if (!enablePopover) {
    return (
      <div
        className="relative size-6 rounded-full"
        style={{ backgroundColor: colorValue }}
        title={name}
      ></div>
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
              className="relative size-6 rounded-full"
              style={{ backgroundColor: colorValue }}
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
                filteredColors.map((color) => (
                  <CommandItem
                    key={color.colorcode}
                    onSelect={() => handleColorSelect(color.colorcode)}
                  >
                    <HStack className="items-center">
                      <div
                        className="relative size-6 rounded-full"
                        style={{ backgroundColor: color.colorValue }}
                      ></div>
                      <span className="ml-2">{color.name}</span>
                    </HStack>
                    {color.colorcode === selectedId && (
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
