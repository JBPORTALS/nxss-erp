"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

import { api } from "~/trpc/react";

export function SyncActiveOrganization() {
  const { setActive, isLoaded } = useOrganizationList();

  // Get the organization ID from the session
  const router = useRouter();

  const utils = api.useUtils();

  // Get the organization ID from the URL
  const { orgId } = useParams();

  useEffect(() => {
    if (!isLoaded) return;

    // If the org ID in the URL is not the same as the org ID in the session (the active organization), set the active organization to be the org ID from the URL
    if (orgId) {
      setActive({ organization: orgId });
    }

    //invalidate the router when orgId changes
    utils.invalidate();
    router.refresh();
  }, [orgId, isLoaded, setActive]);

  return null;
}
