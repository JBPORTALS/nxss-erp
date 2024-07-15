"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { inviteSchema } from "@nxss/validators";

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
