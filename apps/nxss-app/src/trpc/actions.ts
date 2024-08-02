"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { staff } from "node_modules/@nxss/db/src/schema/staff";
import { z } from "zod";

import { and, db, eq } from "@nxss/db";
import {
  CreateBranchScheme,
  ProfileDetailsSchema,
  UpdateBranchScheme,
} from "@nxss/validators";

import { api } from "./server";

export async function inviteMember(values: { slug: string; email: string }) {
  try {
    await api.organization.inviteStaffMember({
      slug: values.slug,
      email: values.email,
    });

    revalidatePath(`/${values.slug}/faculty/invitations`, "page");
  } catch (error) {
    throw error;
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

    await db
      .update(staff)
      .set({
        status: "in_review",
        docUrl: values.docUrl,
      })
      .where(
        and(eq(staff.clerk_user_id, userId), eq(staff.clerk_org_id, orgId)),
      );

    revalidatePath(`/${orgSlug}/dashboard`);

    return { message: res.publicMetadata };
  } catch (err) {
    console.log(err);
    return { error: "There was an error updating the user metadata." };
  }
};

export const completeVerification = async (values: { staffId: string }) => {
  const { userId, orgSlug, orgId } = auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  if (!orgSlug || !orgId) return { message: "No slug or ID" };

  try {
    const res = await db
      .update(staff)
      .set({
        status: "approved",
      })
      .where(
        and(
          eq(staff.clerk_user_id, values.staffId),
          eq(staff.clerk_org_id, orgId),
        ),
      )
      .returning();

    revalidatePath(`/${orgSlug}/faculty`, "layout");

    return { message: res.at(0)?.id };
  } catch (err) {
    console.log(err);
    return { error: "There was an error updating the user metadata." };
  }
};

export const updateBranchDetails = async (
  values: z.infer<typeof UpdateBranchScheme>,
) => {
  const { orgSlug } = auth();

  try {
    await api.branch.updateDetails(values);

    revalidatePath(`/${orgSlug}/branch/${values.id}`, "layout");

    return { message: "Branch details updated" };
  } catch (err) {
    console.log(err);
    return { error: "There was an error updating the branch details." };
  }
};

export const deleteBranch = async (values: { id: string }) => {
  try {
    await api.branch.delete({ id: values.id });
  } catch (err) {
    console.log(err);
    return { error: "There was an error while deleting the branch." };
  }
  redirect("/");
};

export const createBranch = async (
  values: z.infer<typeof CreateBranchScheme>,
) => {
  const { orgSlug } = auth();
  let branch_id: number | undefined;
  try {
    const response = await api.branch.create(values);
    branch_id = response.at(0)?.id;
  } catch (err) {
    console.log(err);
    return { error: "There was an error while creating the branch." };
  }

  revalidatePath(`/${orgSlug}`, "layout"); //revalidate the main layout of sidebar

  if (branch_id) redirect(`/${orgSlug}/branch/${branch_id}`); // redirect to created branch
};

export async function getOrg(slug: string) {
  const { id } = await clerkClient().organizations.getOrganization({ slug });
  return id;
}
