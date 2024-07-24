import { Protect } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import StaffOnboarding from "~/app/_components/staff-onboaring";

export default async function Page({ params }: { params: { org: string } }) {
  const { sessionClaims } = auth();

  const currentOrgClaim = sessionClaims?.metadata;
  console.log(sessionClaims);
  return (
    <div>
      <Protect role="org:staff">
        {!currentOrgClaim?.onboardingComplete ? (
          <StaffOnboarding />
        ) : (
          <>
            <h1>Current status of staff profile</h1>
          </>
        )}
      </Protect>
    </div>
  );
}
