import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { and, eq, ilike, isNull, or, sql } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@nxss/db";
import { Batches, Students } from "@nxss/db/schema";

import { protectedProcedure, router } from "../trpc";

export const studentsRouter = router({
  getStudentsByBranchAndSemester: protectedProcedure
    .input(
      z.object({
        branchId: z.string(),
        semesterId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { branchId, semesterId } = input;

      try {
        const studentsList = await ctx.db
          .select()
          .from(Students)
          .where(
            and(
              eq(Students.branchId, branchId),
              eq(Students.currentSemesterId, semesterId),
              eq(Students.status, "active"),
            ),
          );

        return studentsList;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),
  addStudent: protectedProcedure
    .input(
      z.object({
        full_name: z.string(),
        email: z.string().email(),
        phone_number: z.string().optional(),
        branch_id: z.number(),
        current_semester_id: z.number(),
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
          .insert(Students)
          .values({
            ...input,
            clerkOrgId: org_id,
          })
          .returning();
        return newStaff[0];
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while adding the student",
        });
      }
    }),
  getByBatchId: protectedProcedure
    .input(
      z.object({
        batchId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { batchId } = input;

      try {
        const studentsList = await ctx.db
          .select()
          .from(Students)
          .where(
            and(eq(Students.batch_id, batchId), eq(Students.status, "active")),
          );

        return studentsList;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),
  importStudents: protectedProcedure
    .input(
      z.object({
        branchId: z.number(),
        semesterId: z.number(),
        Students: z.array(
          z.object({
            full_name: z.string(),
            email: z.string().email(),
            phone_number: z.string(),
            date_of_birth: z.string(),
            year_of_join: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { branchId, semesterId, Students: studentsData } = input;
      const orgId = ctx.auth.orgId;

      console.log(branchId);

      if (!orgId)
        return new TRPCError({
          message: "Org not selected",
          code: "BAD_GATEWAY",
        });

      // Process and insert the imported Students
      const insertedStudents = await ctx.db.insert(Students).values(
        studentsData.map((student) => ({
          ...student,
          clerk_org_id: orgId,
          branch_id: branchId,
          current_semester_id: semesterId,
        })),
      );

      return { insertedCount: insertedStudents.rowCount };
    }),
  getInactiveProfiles: protectedProcedure
    .input(
      z.object({
        branchId: z.number().optional(),
        semesterId: z.number().optional(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { branchId, semesterId, limit, offset } = input;

      let query = ctx.db
        .select()
        .from(Students)
        .where(eq(Students.status, "inactive"))
        .limit(limit)
        .offset(offset);

      const inactiveStudents = await query;

      const totalCount = await ctx.db
        .select({ count: sql`count(*)` })
        .from(Students)
        .where(eq(Students.status, "inactive"));

      return {
        Students: inactiveStudents,
        totalCount: Number(totalCount.at(0)?.count),
      };
    }),
  toggleProfileStatus: protectedProcedure
    .input(
      z.union([
        z.object({
          studentId: z.number(),
          newStatus: z.enum(["active", "inactive"]),
        }),
        z.array(
          z.object({
            studentId: z.number(),
            newStatus: z.enum(["active", "inactive"]),
          }),
        ),
      ]),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (Array.isArray(input)) {
          // Multiple profile update
          const updates = input.map(({ studentId, newStatus }) =>
            ctx.db
              .update(Students)
              .set({ status: newStatus, updated_at: new Date() })
              .where(eq(Students.id, studentId)),
          );

          await Promise.all(updates);

          return {
            success: true,
            message: `${input.length} profile(s) updated successfully`,
            count: input.length,
          };
        } else {
          // Single profile update
          const { studentId, newStatus } = input;
          await ctx.db
            .update(Students)
            .set({ status: newStatus, updated_at: new Date() })
            .where(eq(Students.id, studentId));

          return {
            success: true,
            message: `Profile updated successfully`,
            count: 1,
          };
        }
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while updating profile(s)",
        });
      }
    }),
  searchStudents: protectedProcedure
    .input(
      z.object({
        searchTerm: z.string().optional(),
        branchId: z.number(),
        semesterId: z.number(),
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { searchTerm, branchId, semesterId, limit, offset } = input;

      try {
        let baseCondition = and(
          eq(Students.branch_id, branchId),
          eq(Students.current_semester_id, semesterId),
          isNull(Students.batch_id),
        );

        if (searchTerm && searchTerm.length > 0) {
          baseCondition = and(
            baseCondition,
            or(
              ilike(Students.full_name, `%${searchTerm}%`),
              ilike(Students.email, `%${searchTerm}%`),
              ilike(Students.phone_number, `%${searchTerm}%`),
            ),
          );
        }

        const query = ctx.db
          .select({
            id: Students.id,
            full_name: Students.full_name,
            email: Students.email,
            student_id: Students.clerk_user_id,
            phone_number: Students.phone_number,
          })
          .from(Students)
          .where(baseCondition)
          .limit(limit)
          .offset(offset)
          .orderBy(Students.full_name);

        const results = await query;

        // Get total count for pagination
        const countQuery = ctx.db
          .select({ count: sql<number>`count(*)` })
          .from(Students)
          .where(baseCondition);

        const res = await countQuery;

        return {
          Students: results,
          totalCount: Number(res.at(0)?.count),
        };
      } catch (error) {
        console.error("Error in searchStudents:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while searching for Students",
        });
      }
    }),

  addStudentsToBatch: protectedProcedure
    .input(
      z.object({
        batchId: z.string(),
        studentIds: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { batchId, studentIds } = input;

      try {
        // Check if the batch exists
        const batchExists = await ctx.db
          .select()
          .from(Batches)
          .where(eq(Batches.id, batchId))
          .limit(1);

        if (batchExists.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Batch not found",
          });
        }

        // Update Students to assign them to the batch
        const updateResult = await ctx.db
          .update(Students)
          .set({ batch_id: batchId, updated_at: new Date() })
          .where(sql`${Students.id} IN ${studentIds}`);

        if (updateResult.rowCount !== studentIds.length) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "One or more Students could not be updated",
          });
        }

        return {
          success: true,
          message: "Students added to batch successfully",
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "An unexpected error occurred while adding Students to batch",
        });
      }
    }),

  getStudentsByBatch: protectedProcedure
    .input(
      z.object({
        batchId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { batchId } = input;

      try {
        const studentsInBatch = await ctx.db
          .select({
            id: Students.id,
            full_name: Students.fullName,
            email: Students.email,
            student_id: Students.clerkUserId,
          })
          .from(Students)
          .where(eq(Students.batchId, batchId));

        return studentsInBatch;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching Students for the batch",
        });
      }
    }),
  inviteStudentMember: protectedProcedure
    .input(
      z.object({
        studentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const studentMember = await ctx.db
          .select({
            id: Students.id,
            email: Students.email,
            full_name: Students.fullName,
          })
          .from(Students)
          .where(eq(Students.id, input.studentId))
          .limit(1);

        if (studentMember.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "student member not found",
          });
        }

        const member = studentMember[0];

        if (!member)
          throw new TRPCError({
            message: "No student exists with this id",
            code: "BAD_REQUEST",
          });

        const invitation =
          await clerkClient.organizations.createOrganizationInvitation({
            organizationId: ctx.auth.orgId as string,
            emailAddress: member.email,
            inviterUserId: ctx.auth.userId,
            role: "org:student",
            redirectUrl: "fellow://accept-invitation",
          });

        return {
          success: true,
          email: member.email,
          invitationId: invitation.id,
        };
      } catch (error: any) {
        console.error(`Failed to invite student:`, error);
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.errors[0].message,
        });
      }
    }),
});
