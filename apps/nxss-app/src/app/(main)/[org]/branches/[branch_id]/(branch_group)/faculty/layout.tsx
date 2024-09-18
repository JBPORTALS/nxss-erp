import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import { Separator } from "@nxss/ui/seperator";

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
      <ContentAreaHeader>
        <ContentAreaTitle>Faculty</ContentAreaTitle>
        <ContentAreaDescription>
          All staff members with access to{" "}
          <span className="text-foreground">{branch_details?.name}</span> Branch
        </ContentAreaDescription>
      </ContentAreaHeader>
      <Separator />
      <ContentAreaContainer className="w-full">{children}</ContentAreaContainer>
    </ContentArea>
  );
}
