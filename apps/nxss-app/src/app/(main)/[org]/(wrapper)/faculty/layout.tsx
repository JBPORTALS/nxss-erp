import { UserPlus2 } from "lucide-react";

import { Button } from "@nxss/ui/button";
import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";

import { InviteDialog } from "~/app/_components/dailog/invite-dialog";
import FacultyTabsClient from "~/app/_components/tabs/faculty-tabs";

export default function Template(props: { children: React.ReactNode }) {
  return (
    <ContentArea>
      <ContentAreaHeader className="flex justify-between">
        <div className="flex flex-col gap-2">
          <ContentAreaTitle>Faculty</ContentAreaTitle>
          <ContentAreaDescription>
            All staff members with access to <b>RJS</b> institution.
          </ContentAreaDescription>
        </div>
        <InviteDialog>
          <Button>
            Invite <UserPlus2 className="size-4" />
          </Button>
        </InviteDialog>
      </ContentAreaHeader>
      <ContentAreaHeader>
        <FacultyTabsClient />
      </ContentAreaHeader>
      <ContentAreaContainer className="w-full">
        {props.children}
      </ContentAreaContainer>
    </ContentArea>
  );
}
