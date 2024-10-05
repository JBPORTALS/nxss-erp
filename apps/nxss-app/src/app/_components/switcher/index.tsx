"use client";

import React from "react";
import { useParams } from "next/navigation";
import { SlashIcon } from "lucide-react";

import CustomOrganizationSwitcher from "./organizatoin-switcher";
import SemesterSwitcher from "./semester-switcher";

export default function Switchers() {
  const params = useParams();
  return (
    <React.Fragment>
      {params.org && (
        <React.Fragment>
          <SlashIcon className="size-4 -rotate-12 text-muted-foreground/40" />
          <CustomOrganizationSwitcher />
        </React.Fragment>
      )}
      {params.semester_id && (
        <React.Fragment>
          <SlashIcon className="size-4 -rotate-12 text-muted-foreground/40" />
          <SemesterSwitcher />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
