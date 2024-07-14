"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { inviteSchema } from "@nxss/validators";

import { api } from "./server";

export async function inviteMembers(
  values: z.infer<typeof inviteSchema> & { slug: string },
) {
  try {
    await api.organization.inviteStaffMembers({
      slug: values.slug,
      emails: values.emails.split(",").map((email) => email.trim()),
    });

    revalidatePath(`/${values.slug}/faculty/invitations`);
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

    revalidatePath(`/${values.slug}/faculty/invitations`);
  } catch (e) {
    const error = e as Error;
    return new Error(error.message);
  }
}
