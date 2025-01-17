import { redirect } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function page() {
  const { orgId, userId } = auth();

  if (!userId) redirect("/sign-in");

  if (!orgId) {
    const organizations =
      await clerkClient().users.getOrganizationMembershipList({ userId });
    if (organizations.totalCount > 0)
      redirect(`/${organizations.data.at(0)?.organization.slug}/dashboard`); //if orgId is not active select first organization in the list
    else redirect(`/create-organization`); //if there is no organization created  - create one
  }

  redirect(`/${orgId}/dashboard`);
}
