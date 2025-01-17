import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";

export default async function BranchPage({
  params,
}: {
  params: { branch_id: string; org: string };
}) {
  return (
    <div className="flex h-screen">
      <ContentArea>
        <ContentAreaHeader>
          <ContentAreaTitle>Students</ContentAreaTitle>
          <ContentAreaDescription>
            All student in this branch & semester
          </ContentAreaDescription>
        </ContentAreaHeader>
        <ContentAreaContainer></ContentAreaContainer>
      </ContentArea>
    </div>
  );
}
