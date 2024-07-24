"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RocketIcon } from "lucide-react";

import { Button } from "@nxss/ui/button";

function Invitation() {
  const ticket = useSearchParams().get("__clerk_ticket");
  const status = useSearchParams().get("__clerk_status");
  const org_name = useSearchParams().get("org_name");
  const router = useRouter();

  function onAcceptInvitation() {
    if (status === "sign_up") {
      router.push(`/invite/sign-up?__clerk_ticket=${ticket}`);
    } else if (status === "sign_in") {
      router.push(`/sign-in?__clerk_ticket=${ticket}`);
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center pt-20">
      <div className="w-[430px] space-y-8 pt-14">
        <div className="flex flex-col items-center gap-3">
          <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <RocketIcon className="size-8 text-primary-foreground" />
          </div>
          <h1 className="px-3 text-center text-2xl font-semibold">
            {org_name} is inviting you as a staff member.
          </h1>
          <p className="text-center text-muted-foreground">
            Empower your Staffs and Students streamline processes, and improve
            decision-making with Nexus ERP
          </p>
        </div>

        <Button onClick={onAcceptInvitation} size={"lg"} className="w-full">
          Accept Invitation
        </Button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Invitation />
    </Suspense>
  );
}
