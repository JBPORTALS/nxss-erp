import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

export function useLocalOrganization() {
  const params = useParams();

  if (!params.orgId)
    throw new Error(
      "useLocalOrganization hook can only used under the orgId param access segment",
    );

  const { userMemberships } = useOrganizationList({ userMemberships: true });
  const organizations = userMemberships?.data ?? [];

  const activeOrganization = organizations.find(
    (mem) => mem.organization.id === params.orgId,
  );

  return {
    ...activeOrganization?.organization,
    role: activeOrganization?.role,
  };
}
