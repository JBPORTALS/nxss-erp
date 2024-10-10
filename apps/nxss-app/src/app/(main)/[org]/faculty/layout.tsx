"use client";

import { useOrganization } from "@clerk/nextjs";

import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import { Separator } from "@nxss/ui/seperator";

import AddStaffDialog from "~/app/_components/dailog/add-staff";

export default function Template({ children }: { children: React.ReactNode }) {
  const { organization } = useOrganization();

  return (
    <ContentArea>
      <ContentAreaHeader className="flex-row justify-between">
        <div className="space-y-2">
          <ContentAreaTitle>Faculty</ContentAreaTitle>
          <ContentAreaDescription>
            All staff members with access to{" "}
            <span className="text-foreground">{organization?.name}</span> Branch
          </ContentAreaDescription>
        </div>
        <AddStaffDialog />
      </ContentAreaHeader>
      <Separator />
      <ContentAreaContainer className="w-full">{children}</ContentAreaContainer>
    </ContentArea>
  );
}
