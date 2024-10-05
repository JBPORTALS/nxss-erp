import { z } from "zod";

import { and, asc, eq, or, schema } from "@nxss/db";

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
    .query(({ input, ctx }) => {
      const { branchId } = input;
      return ctx.db.query.semesters.findMany({
        where: eq(semesters.branch_id, branchId),
      });
    }),
});
