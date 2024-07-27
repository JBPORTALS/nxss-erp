"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth, useOrganizationList } from "@clerk/nextjs";

import { getOrg } from "~/trpc/actions";

export function SyncActiveOrganization() {
  const { setActive, isLoaded } = useOrganizationList();

  // Get the organization ID from the session
  const { orgSlug } = useAuth();

  // Get the organization ID from the URL
  const { org: orgSlugUrl } = useParams() as { org: string };

  useEffect(() => {
    if (!isLoaded) return;

    // If the org ID in the URL is not the same as the org ID in the session (the active organization), set the active organization to be the org ID from the URL
    if (orgSlugUrl && orgSlugUrl !== orgSlug) {
      async () => {
        const orgId = await getOrg(orgSlugUrl);
        void setActive({ organization: orgId });
      };
    }
  }, [orgSlug, isLoaded, setActive, orgSlugUrl]);

  return null;
}
