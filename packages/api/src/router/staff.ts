import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { desc } from "@nxss/db";
import { staff } from "@nxss/db/schema"; // Import your staff schema

import { protectedProcedure, router } from "../trpc";

export const staffRouter = router({
  addStaff: protectedProcedure
    .input(
      z.object({
        full_name: z.string(),
        email: z.string().email(),
        phone_number: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const org_id = ctx.auth.orgId;

        if (!org_id)
          throw new TRPCError({
            message: "No selected orgnaization",
            code: "BAD_REQUEST",
          });

        const newStaff = await ctx.db
          .insert(staff)
          .values({ ...input, clerk_org_id: org_id })
          .returning();
        return newStaff[0];
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while adding the staff member",
        });
      }
    }),

  removeStaff: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input: id }) => {
      try {
        const removedStaff = await ctx.db
          .delete(staff)
          .where(eq(staff.id, id))
          .returning();
        if (removedStaff.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Staff member not found",
          });
        }
        return removedStaff[0];
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while removing the staff member",
        });
      }
    }),

  getAllStaff: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db
        .select()
        .from(staff)
        .where(eq(staff.clerk_org_id, ctx.auth.orgId!))
        .orderBy(desc(staff.created_at));
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occurred while fetching all staff members",
      });
    }
  }),

  getStaff: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input: id }) => {
      try {
        const staffMember = await ctx.db
          .select()
          .from(staff)
          .where(eq(staff.id, id));
        if (staffMember.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Staff member not found",
          });
        }
        return staffMember[0];
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching the staff member",
        });
      }
    }),

  updateStaff: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          full_name: z.string().optional(),
          email: z.string().email().optional(),
          phone_number: z.string().optional(),
          clerk_user_id: z.string().optional(),
          clerk_org_id: z.string().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedStaff = await ctx.db
          .update(staff)
          .set({ ...input.data, updated_at: new Date() })
          .where(eq(staff.id, input.id))
          .returning();
        if (updatedStaff.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Staff member not found",
          });
        }
        return updatedStaff[0];
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while updating the staff member",
        });
      }
    }),
  inviteStaffMember: protectedProcedure
    .input(
      z.object({
        staffId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const staffMember = await ctx.db
          .select({
            id: staff.id,
            email: staff.email,
            full_name: staff.full_name,
          })
          .from(staff)
          .where(eq(staff.id, input.staffId))
          .limit(1);

        if (staffMember.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Staff member not found",
          });
        }

        const member = staffMember[0];

        if (!member)
          throw new TRPCError({
            message: "No staff exists with this id",
            code: "BAD_REQUEST",
          });

        const invitation =
          await clerkClient.organizations.createOrganizationInvitation({
            organizationId: ctx.auth.orgId as string,
            emailAddress: member.email,
            inviterUserId: ctx.auth.userId,
            role: "org:staff",
            redirectUrl: `http://localhost:3000/accept-invitation`,
          });

        return {
          success: true,
          email: member.email,
          invitationId: invitation.id,
        };
      } catch (error: any) {
        console.error(`Failed to invite staff member:`, error);
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.errors[0].message,
        });
      }
    }),
});
