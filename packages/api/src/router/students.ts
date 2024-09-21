import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
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
});
