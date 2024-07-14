import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const organizationRouter = router({
  getMembershipList: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const currentUserId = ctx.auth.userId;
      console.log(currentUserId);
      try {
        const organization = await clerkClient().organizations.getOrganization({
          slug: input.slug,
        });
        const memberList =
          await clerkClient().organizations.getOrganizationMembershipList({
            organizationId: organization.id,
          });

        const members = await Promise.all(
          memberList.data.map(async (member) => {
            return {
              id: member.id,
              userId: member.publicUserData?.userId,
              firstName: member.publicUserData?.firstName,
              lastName: member.publicUserData?.lastName,
              email: member.publicUserData?.identifier,
              role: member.role,
              imageUrl: member.publicUserData?.imageUrl,
              isAdmin: member.role === "admin",
            };
          }),
        );

        // Sort members with admins first, then alphabetically by last name
        members.sort((a, b) => {
          return a.isAdmin ? -1 : 1;
        });

        return {
          organization: {
            id: organization.id,
            name: organization.name,
            slug: organization.slug,
          },
          members: members.filter((member) => member.userId != currentUserId),
        };
      } catch (error) {
        console.error("Error fetching organization members:", error);
        throw new Error("Failed to fetch organization members");
      }
    }),
});
