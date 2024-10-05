"use client";

import React, { useState } from "react";
import { ListEnd } from "lucide-react";
import Select, { MultiValue } from "react-select";

import { cn } from "@nxss/ui";
import { Badge } from "@nxss/ui/badge";
import { Separator } from "@nxss/ui/seperator";

import { api } from "~/trpc/react";

const DynamicBranchSelect = ({
  onSelect,
}: {
  onSelect: (values?: {
    branch?: string;
    semester?: string;
    section?: string;
  }) => void;
  values?: {
    branch?: string;
    section?: string;
    semester?: string;
  };
}) => {
  const [values, setValues] = useState<
    MultiValue<{ label: string; value: string }>
  >([]);

  const branch = values?.at(0);
  const semester = values?.at(1);

  // Mock data - replace with actual data fetching logic
  const branches = api.branch.getBranchList.useQuery();
  const semesters = api.semester.getSemesterList.useQuery(
    { branchId: parseInt(branch?.value!) },
    { enabled: !!branch },
  );

  const branchOptions = branches.data?.flatMap((branch) => ({
    value: branch.id.toString(),
    label: branch.name,
  }));

  const semesterOptions = semesters.data?.flatMap((branch) => ({
    value: branch.id.toString(),
    label: `Semester ${branch.number}`,
  }));

  const options =
    !branch && !semester
      ? branchOptions
      : branch && !semester
        ? semesterOptions
        : [];

  return (
    <Select
      closeMenuOnSelect={false}
      defaultValue={values}
      onChange={(newValue) => setValues(newValue)}
      isMulti
      options={options}
      placeholder={"Select scope"}
      unstyled
      classNames={{
        control: (state) =>
          cn(
            "h-10 rounded-md bg-background px-3",
            state.isFocused
              ? "border border-primary ring-2 ring-ring/25"
              : "border border-input",
            state.isDisabled && "opacity-50",
          ),
        menu: (state) =>
          cn(
            "pointer-events-auto mt-2 rounded-md border bg-popover p-3 text-popover-foreground shadow-md outline-none",
          ),
        menuPortal: (state) => cn(state.position),
        option: (state) =>
          cn(
            "cursor-pointer rounded-md px-3 py-2 transition-all duration-200",
            state.isFocused && "bg-accent",
          ),
        placeholder: (state) => cn("pl-2 text-sm text-muted-foreground"),
        indicatorsContainer: (state) =>
          cn("flex items-center gap-2 text-accent-foreground/80"),
        indicatorSeparator: (state) => cn("h-full w-1 bg-input"),
        valueContainer: (state) => cn("flex space-x-2"),
      }}
      noOptionsMessage={(obj) => (
        <div className="flex flex-col items-center gap-1 py-4">
          <ListEnd className="size-10 text-muted" />
          <span className="text-sm">No options more</span>
          <p className="text-xs text-muted-foreground">
            There is no further scope
          </p>
        </div>
      )}
      components={{
        MultiValue: (props) => (
          <React.Fragment>
            <Separator
              orientation="vertical"
              className="h-6 w-px rotate-[25deg] first:hidden"
            />
            <Badge variant={"secondary"} className="rounded-md font-normal">
              {props.children}
            </Badge>
          </React.Fragment>
        ),
      }}
    />
  );
};

export default DynamicBranchSelect;
