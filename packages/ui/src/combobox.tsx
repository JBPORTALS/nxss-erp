"use client";

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

export function ComboboxDemo() {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>hello</PopoverTrigger>
        <PopoverContent className="w-full">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Staffs">
                <CommandItem>FOC</CommandItem>
                <CommandItem>FOC</CommandItem>
                <CommandItem>FOC</CommandItem>
                <CommandItem>FOC</CommandItem>
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
