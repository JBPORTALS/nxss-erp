import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const organizationRouter = router({
  getMembershipList: protectedProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const currentUserId = ctx.auth.userId;
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
  getInvitationsList: protectedProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      try {
        const organization = await clerkClient().organizations.getOrganization({
          slug: input.slug,
        });
        const invitaionList =
          await clerkClient().organizations.getOrganizationInvitationList({
            organizationId: organization.id,
          });

        const invitations = await Promise.all(
          invitaionList.data.map(async (invitation) => {
            return {
              id: invitation.id,
              status: invitation.status,
              email: invitation.emailAddress,
              role: invitation.role,
              createdAt: invitation.createdAt,
            };
          }),
        );

        // Sort invitations by createdAt timestamp in desc order first
        const sortedInvitatins = invitations
          .sort((a, b) => {
            return b.createdAt - a.createdAt;
          })
          .filter((invitation) => invitation.status === "pending");

        return {
          organization: {
            id: organization.id,
            name: organization.name,
            slug: organization.slug,
          },
          invitations: sortedInvitatins,
        };
      } catch (error) {
        console.error("Error fetching organization members:", error);
        throw new Error("Failed to fetch organization members");
      }
    }),
  inviteStaffMember: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const currentUserId = ctx.auth.userId;
      try {
        const organization = await clerkClient().organizations.getOrganization({
          slug: input.slug,
        });

        //get base URL for Invitation redirect
        const baseURL =
          process.env.NODE_ENV === "development"
            ? `http://localhost:${process.env.PORT}`
            : `https://nexusserp.vercel.app`;
        //map the list of emails to sent invitation
        return clerkClient().organizations.createOrganizationInvitation({
          emailAddress: input.email,
          organizationId: organization.id,
          role: "org:staff",
          inviterUserId: currentUserId,
          redirectUrl: `${baseURL}/invite?org_name=${organization.name}`,
        });
      } catch (error) {
        console.error("Error sending invitation to member:", error);
        throw new Error("Failed to send invitation");
      }
    }),
  revokeInvitation: protectedProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        invitationId: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const currentUserId = ctx.auth.userId;
      try {
        const organization = await clerkClient().organizations.getOrganization({
          slug: input.slug,
        });

        return clerkClient().organizations.revokeOrganizationInvitation({
          invitationId: input.invitationId,
          organizationId: organization.id,
          requestingUserId: currentUserId,
        });
      } catch (error) {
        console.error("Error fetching organization members:", error);
        throw new Error("Failed to fetch organization members");
      }
    }),
});
