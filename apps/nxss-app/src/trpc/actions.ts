"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import {
  CreateBranchScheme,
  CreateOrganizationBackendScheme,
  UpdateBranchScheme,
} from "@nxss/validators";

import { api } from "./server";

export const updateBranchDetails = async (
  values: z.infer<typeof UpdateBranchScheme>,
) => {
  const { orgSlug } = auth();

  try {
    await api.branch.updateDetails(values);

    revalidatePath(`/${orgSlug}/branch/${values.id}`);

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

  if (branch_id) redirect(`/${orgSlug}/branches/${branch_id}`); // redirect to created branch
};

export async function getOrg(slug: string) {
  const { id } = await clerkClient().organizations.getOrganization({ slug });
  return id;
}
