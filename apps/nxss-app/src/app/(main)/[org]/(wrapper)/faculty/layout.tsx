import { Button } from "@nxss/ui/button";

import { InviteDialog } from "~/app/_components/dailog/invite-dialog";
import FacultyTabsClient from "~/app/_components/tabs/faculty-tabs";

export default function Template(props: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Faculty</h1>
          <p className="text-sm text-muted-foreground">
            All staff members with access to <b>RJS</b> institution.
          </p>
        </div>
        <InviteDialog>
          <Button>Invite Member</Button>
        </InviteDialog>
      </div>
      <FacultyTabsClient />
      <section className="w-full">{props.children}</section>
    </div>
  );
}
