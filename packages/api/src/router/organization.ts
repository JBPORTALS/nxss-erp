import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, db, eq } from "@nxss/db";

import { staff } from "../../../db/src/schema/staff";
import { protectedProcedure, router } from "../trpc";

export const organizationRouter = router({
  getMembershipList: protectedProcedure
    .input(
      z.object({ slug: z.string().min(1), unApproved: z.boolean().optional() }),
    )
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
            //fetch the status of staff profile
            const staffData = await db
              .select()
              .from(staff)
              .where(
                and(
                  eq(staff.clerk_user_id, member.publicUserData?.userId ?? ""),
                  eq(staff.clerk_org_id, organization.id),
                ),
              );

            return {
              id: member.id,
              userId: member.publicUserData?.userId ?? "",
              firstName: member.publicUserData?.firstName,
              lastName: member.publicUserData?.lastName,
              email: member.publicUserData?.identifier,
              role: member.role,
              imageUrl: member.publicUserData?.imageUrl,
              createdAt: staffData.at(0)?.createdAt ?? Date(),
              isAdmin: member.role === "admin",
              status: staffData.at(0)?.status,
            };
          }),
        );

        const approvedMembers = members.filter((member) => {
          if (input.unApproved) return member.status === "in_review";
          // Check if the staff status is 'approved'
          return member.status === "approved";
        });

        // console.log("staffData", approvedMembers);
        return {
          organization: {
            id: organization.id,
            name: organization.name,
            slug: organization.slug,
          },
          members: approvedMembers.filter(
            (member) => member?.userId != currentUserId,
          ),
        };
      } catch (error) {
        console.error("Error fetching organization members:", error);
        throw new Error("Failed to fetch organization members");
      }
    }),
  getInvitationsList: protectedProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ input }) => {
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
  getStaffProfileStatus: protectedProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.auth.userId;
    const currentOrgId = ctx.auth.orgId;
    try {
      if (!currentOrgId)
        throw new TRPCError({
          message: "No organization selected",
          code: "BAD_REQUEST",
        });

      const organization = await db
        .select()
        .from(staff)
        .where(
          and(
            eq(staff.clerk_user_id, currentUserId),
            eq(staff.clerk_org_id, currentOrgId),
          ),
        );

      return {
        status: organization.at(0)?.status,
      };
    } catch (error) {
      console.error("Error fetching organization members:", error);
      throw new Error("Failed to fetch organization members");
    }
  }),
});
