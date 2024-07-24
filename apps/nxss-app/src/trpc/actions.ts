"use server";

import { revalidatePath } from "next/cache";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import { ProfileDetailsSchema } from "@nxss/validators";

import { api } from "./server";

export async function inviteMember(values: { slug: string; email: string }) {
  try {
    await api.organization.inviteStaffMember({
      slug: values.slug,
      email: values.email,
    });

    revalidatePath(`/${values.slug}/faculty/invitations`, "page");
  } catch (e) {
    const error = e as Error;
    return new Error(error.message);
  }
}

export async function revokeInvitation(values: {
  invitationId: string;
  slug: string;
}) {
  try {
    await api.organization.revokeInvitation(values);

    revalidatePath(`/${values.slug}/faculty/invitations`, "page");
  } catch (e) {
    const error = e as Error;
    return new Error(error.message);
  }
}

export const completeOnboarding = async (
  values: z.infer<typeof ProfileDetailsSchema>,
) => {
  const { userId, orgSlug, orgId } = auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  if (!orgSlug || !orgId) return { message: "No slug or ID" };

  try {
    const res = await clerkClient().users.updateUser(userId, {
      publicMetadata: {
        metadata: {
          onboardingComplete: true,
        },
      },
      firstName: values.firstName,
      lastName: values.lastName,
      createOrganizationEnabled: false,
    });

    return { message: res.publicMetadata };
  } catch (err) {
    console.log(err);
    return { error: "There was an error updating the user metadata." };
  }
};
