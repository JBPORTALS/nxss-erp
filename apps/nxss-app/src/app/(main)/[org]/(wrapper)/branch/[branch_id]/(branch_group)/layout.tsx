import { notFound } from "next/navigation";

import { Button } from "@nxss/ui/button";

import BranchTabsClient from "~/app/_components/tabs/branch-tabs";
import { api } from "~/trpc/server";

export default async function Template(props: {
  children: React.ReactNode;
  params: { branch_id: string };
}) {
  const branch_details = await api.branch.getDetails({
    id: props.params.branch_id,
  });

  if (!branch_details) return notFound();

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{branch_details.name}</h1>
          <p className="text-sm text-muted-foreground">
            {branch_details.description}
          </p>
        </div>
        {/* Invite Student */}
        <Button>Invite Student</Button>
      </div>
      <BranchTabsClient />
      <section className="w-full">{props.children}</section>
    </div>
  );
}
