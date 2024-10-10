import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, asc, eq, or, schema } from "@nxss/db";
import { academicYears } from "@nxss/db/schema";

import { protectedProcedure, router } from "../trpc";

const { semesters } = schema;

export const semesterRouter = router({
  // ... other procedures

  getDefaultSemester: protectedProcedure
    .input(z.object({ branchId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { branchId } = input;

      const defaultSemester = await ctx.db.query.semesters.findFirst({
        where: and(
          eq(semesters.branch_id, branchId),
          or(eq(semesters.status, "current"), eq(semesters.status, "upcoming")),
        ),
        orderBy: asc(semesters.status),
      });

      if (!defaultSemester) {
        throw new Error("No active or upcoming semester found for this branch");
      }

      return defaultSemester;
    }),
  getSemesterList: protectedProcedure
    .input(z.object({ branchId: z.number() }))
    .query(async ({ input, ctx }) => {
      const { branchId } = input;
      const institutionId = ctx.auth.orgId;

      if (!institutionId)
        throw new TRPCError({
          message: "No organization selected",
          code: "BAD_GATEWAY",
        });

      const academicYear = await ctx.db.query.academicYears.findFirst({
        where: and(
          eq(academicYears.year, "2024"),
          eq(academicYears.institution_id, institutionId),
        ),
      });

      if (!academicYear)
        throw new TRPCError({
          message: "No academic year",
          code: "INTERNAL_SERVER_ERROR",
        });

      return await ctx.db.query.semesters.findMany({
        where: and(
          eq(semesters.branch_id, branchId),
          eq(semesters.academic_year_id, academicYear.id),
        ),
        with: {
          branch: true,
        },
      });
    }),
});
