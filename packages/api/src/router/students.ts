import { TRPCError } from "@trpc/server";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@nxss/db";

import { protectedProcedure, router } from "../trpc";

const { branches, semesters, students } = schema;

export const studentsRouter = router({
  getStudentsByBranchAndSemester: protectedProcedure
    .input(
      z.object({
        branchId: z.number(),
        semesterId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { branchId, semesterId } = input;

      try {
        const studentsList = await ctx.db
          .select()
          .from(students)
          .where(
            and(
              eq(students.branch_id, branchId),
              eq(students.current_semester_id, semesterId),
              eq(students.status, "active"),
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
  importStudents: protectedProcedure
    .input(
      z.object({
        branchId: z.number(),
        semesterId: z.number(),
        students: z.array(
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
      const { branchId, semesterId, students: studentsData } = input;
      const orgId = ctx.auth.orgId;

      console.log(branchId);

      if (!orgId)
        return new TRPCError({
          message: "Org not selected",
          code: "BAD_GATEWAY",
        });

      // Process and insert the imported students
      const insertedStudents = await ctx.db.insert(students).values(
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
        .from(students)
        .where(eq(students.status, "inactive"))
        .limit(limit)
        .offset(offset);

      const inactiveStudents = await query;

      const totalCount = await ctx.db
        .select({ count: sql`count(*)` })
        .from(students)
        .where(eq(students.status, "inactive"));

      return {
        students: inactiveStudents,
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
              .update(students)
              .set({ status: newStatus, updated_at: new Date() })
              .where(eq(students.id, studentId)),
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
            .update(students)
            .set({ status: newStatus, updated_at: new Date() })
            .where(eq(students.id, studentId));

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
});
