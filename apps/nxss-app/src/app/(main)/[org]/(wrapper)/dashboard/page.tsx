import { Protect } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";

import StaffOnboarding from "~/app/_components/staff-onboaring";

export default async function Page({ params }: { params: { org: string } }) {
  const { sessionClaims } = auth();
  const org = await clerkClient().organizations.getOrganization({
    slug: params.org,
  });
  const currentOrgClaim = sessionClaims?.metadata.staff?.organizations?.find(
    (val) => val.org_id === org.id,
  );

  return (
    <div>
      <h1 className="text-lg"></h1>
      <Protect role="org:staff">
        {currentOrgClaim?.status === "initial" || !currentOrgClaim?.status ? (
          <StaffOnboarding />
        ) : (
          <>
            <h1>Current status of staff profile {currentOrgClaim.status}</h1>
          </>
        )}
      </Protect>
    </div>
  );
}
