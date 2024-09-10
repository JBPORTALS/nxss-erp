import { Button } from "@nxss/ui/button";
import {
  ContentArea,
  ContentAreaContent,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaLeft,
  ContentAreaRight,
  ContentAreaSubheader,
  ContentAreaTitle,
} from "@nxss/ui/contentarea";

import { InviteDialog } from "~/app/_components/dailog/invite-dialog";
import FacultyTabsClient from "~/app/_components/tabs/faculty-tabs";

export default function Template(props: { children: React.ReactNode }) {
  return (
    <ContentArea className="h-full w-full">
      <ContentAreaHeader>
        <ContentAreaLeft>
          <ContentAreaTitle>Faculty</ContentAreaTitle>
          <ContentAreaDescription>
            All staff members with access to <b>RJS</b> institution.
          </ContentAreaDescription>
        </ContentAreaLeft>
        <ContentAreaRight>
          <InviteDialog>
            <Button>Invite Member</Button>
          </InviteDialog>
        </ContentAreaRight>
      </ContentAreaHeader>

      <ContentAreaSubheader>
        <FacultyTabsClient />
      </ContentAreaSubheader>

      <ContentAreaContent>{props.children}</ContentAreaContent>
    </ContentArea>
  );
}
