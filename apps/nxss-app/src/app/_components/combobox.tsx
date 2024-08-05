"use client";

import React, { useState } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";

const frameworks = [
  { value: "foc", label: "FOC" },
  { value: "maths", label: "Maths" },
  { value: "itskills", label: "Itskills" },
  { value: "feee", label: "FEEE" },
];

export function ComboboxDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (value: any) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex w-[200px] items-center justify-between rounded-lg border-2 bg-white px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-gray-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue
          ? frameworks.find((f) => f.value === selectedValue)?.label
          : "Select subjects..."}
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>
      {isOpen && (
        <ul className="absolute mt-1 w-[200px] rounded-md border bg-white shadow-lg">
          {frameworks.map((framework) => (
            <li
              key={framework.value}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleSelect(framework.value)}
            >
              {framework.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
