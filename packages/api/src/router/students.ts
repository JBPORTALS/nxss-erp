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

        if (studentsList.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No students found for the given branch and semester",
          });
        }

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
});
