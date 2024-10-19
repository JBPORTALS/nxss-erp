"use client";

import React from "react";
import { ListEnd, Loader } from "lucide-react";
import Select, { MultiValue, MultiValueProps } from "react-select";

import { cn } from "@nxss/ui";
import { Badge } from "@nxss/ui/badge";
import { Separator } from "@nxss/ui/seperator";
import { Skeleton } from "@nxss/ui/skeleton";

import { api } from "~/trpc/react";

export const ScopeSelect = ({
  values,
  ...props
}: React.ComponentProps<typeof Select> & {
  values: MultiValue<{ label: string; value: string }>;
}) => {
  const branch = values?.at(0);
  const semester = values?.at(1);
  const section = values?.at(2);
  const batch = values?.at(3);

  // Mock data - replace with actual data fetching logic
  const branches = api.branch.getBranchList.useQuery();
  const semesters = api.semester.getSemesterList.useQuery(
    { branchId: parseInt(branch?.value!) },
    { enabled: !!branch && branch.value !== "all" },
  );
  const sections = api.sections.getAll.useQuery(
    { semesterId: parseInt(semester?.value!) },
    { enabled: !!semester },
  );
  const batches = api.batches.getBatchList.useQuery(
    { sectionId: parseInt(section?.value!) },
    { enabled: !!section },
  );

  const branchOptions =
    branches.data?.flatMap((branch) => ({
      value: branch.id.toString(),
      label: branch.name,
    })) ?? [];

  const semesterOptions = semesters.data?.flatMap((semester) => ({
    value: semester.id.toString(),
    label: `Semester ${semester.number}`,
  }));

  const sectionsOptions = sections.data?.flatMap((section) => ({
    value: section.id.toString(),
    label: `Section ${section.name}`,
  }));

  const batchesOptions = batches.data?.flatMap((batches) => ({
    value: batches.id.toString(),
    label: `${batches.name}`,
  }));

  const options =
    !branch && !semester
      ? [{ value: "all", label: "All" }, ...branchOptions]
      : branch && !semester
        ? semesterOptions
        : branch && semester && !section
          ? sectionsOptions
          : branch && semester && section && !batch
            ? batchesOptions
            : [];

  return (
    <Select
      isLoading={
        semesters.isLoading ||
        branches.isLoading ||
        sections.isLoading ||
        batches.isLoading
      }
      closeMenuOnSelect={false}
      loadingMessage={() => (
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: 4 }).flatMap((_, i) => (
            <Skeleton className="h-10 w-full rounded-md delay-75" />
          ))}
        </div>
      )}
      defaultValue={values}
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
            "pointer-events-auto mt-2 rounded-md border bg-popover px-2 py-3 text-popover-foreground shadow-md outline-none",
          ),
        dropdownIndicator: (state) =>
          cn(
            "cursor-pointer text-muted-foreground transition-all duration-300 hover:text-foreground",
            state.selectProps.menuIsOpen && "rotate-180",
          ),
        clearIndicator: (state) =>
          cn("cursor-pointer text-muted-foreground hover:text-foreground"),
        option: (state) =>
          cn(
            "cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200",
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
        LoadingIndicator: (props) => (
          <Loader className="duration-[4000] size-5 animate-spin" />
        ),
      }}
      {...props}
    />
  );
};
