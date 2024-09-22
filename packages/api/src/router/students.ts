import { TRPCError } from "@trpc/server";
import { and, eq, ilike, isNull, or, sql } from "drizzle-orm";
import { z } from "zod";

import { schema } from "@nxss/db";
import { batches } from "@nxss/db/schema";

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
          .from(students)
          .where(
            and(eq(students.batch_id, batchId), eq(students.status, "active")),
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
          eq(students.branch_id, branchId),
          eq(students.current_semester_id, semesterId),
          isNull(students.batch_id),
        );

        if (searchTerm && searchTerm.length > 0) {
          baseCondition = and(
            baseCondition,
            or(
              ilike(students.full_name, `%${searchTerm}%`),
              ilike(students.email, `%${searchTerm}%`),
              ilike(students.phone_number, `%${searchTerm}%`),
            ),
          );
        }

        const query = ctx.db
          .select({
            id: students.id,
            full_name: students.full_name,
            email: students.email,
            student_id: students.clerk_user_id,
            phone_number: students.phone_number,
          })
          .from(students)
          .where(baseCondition)
          .limit(limit)
          .offset(offset)
          .orderBy(students.full_name);

        const results = await query;

        // Get total count for pagination
        const countQuery = ctx.db
          .select({ count: sql<number>`count(*)` })
          .from(students)
          .where(baseCondition);

        const res = await countQuery;

        return {
          students: results,
          totalCount: Number(res.at(0)?.count),
        };
      } catch (error) {
        console.error("Error in searchStudents:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while searching for students",
        });
      }
    }),

  addStudentsToBatch: protectedProcedure
    .input(
      z.object({
        batchId: z.number(),
        studentIds: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { batchId, studentIds } = input;

      try {
        // Check if the batch exists
        const batchExists = await ctx.db
          .select()
          .from(batches)
          .where(eq(batches.id, batchId))
          .limit(1);

        if (batchExists.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Batch not found",
          });
        }

        // Update students to assign them to the batch
        const updateResult = await ctx.db
          .update(students)
          .set({ batch_id: batchId, updated_at: new Date() })
          .where(sql`${students.id} IN ${studentIds}`);

        if (updateResult.rowCount !== studentIds.length) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "One or more students could not be updated",
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
            "An unexpected error occurred while adding students to batch",
        });
      }
    }),

  getStudentsByBatch: protectedProcedure
    .input(
      z.object({
        batchId: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { batchId } = input;

      try {
        const studentsInBatch = await ctx.db
          .select({
            id: students.id,
            full_name: students.full_name,
            email: students.email,
            student_id: students.clerk_user_id,
          })
          .from(students)
          .where(eq(students.batch_id, batchId));

        return studentsInBatch;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching students for the batch",
        });
      }
    }),
});
