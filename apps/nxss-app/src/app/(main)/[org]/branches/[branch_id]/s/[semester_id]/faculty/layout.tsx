import { PlusCircle } from "lucide-react";

import { Button } from "@nxss/ui/button";
import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import { Separator } from "@nxss/ui/seperator";

import AddStaffDialog from "~/app/_components/dailog/add-staff";
import { api } from "~/trpc/server";

export default async function Template({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    org: string;
    branch_id: string;
    sem_id: string;
  };
}) {
  const branch_details = await api.branch.getDetails({ id: params.branch_id });

  return (
    <ContentArea>
      <ContentAreaHeader className="flex-row justify-between">
        <div className="space-y-2">
          <ContentAreaTitle>Faculty</ContentAreaTitle>
          <ContentAreaDescription>
            All staff members with access to{" "}
            <span className="text-foreground">{branch_details?.name}</span>{" "}
            Branch
          </ContentAreaDescription>
        </div>
        <AddStaffDialog />
      </ContentAreaHeader>
      <Separator />
      <ContentAreaContainer className="w-full">{children}</ContentAreaContainer>
    </ContentArea>
  );
}
