import { z } from "zod";

import { eq, schema } from "@nxss/db";

import { protectedProcedure, router } from "../trpc";

const { branches, semesters } = schema;

export const branchesRouter = router({
  getBranchList: protectedProcedure.query(async ({ ctx }) => {
    const branchList = await ctx.db.query.branches.findMany({
      where: eq(branches.institution_id, ctx.auth.orgId ?? ""),
    });

    const semester_number = await ctx.db.query.semesters.findFirst({
      where: eq(semesters.institution_id, ctx.auth.orgId ?? ""),
    });

    const mapped_response = branchList.map((value) => ({
      semesters: semester_number?.number,
      ...value,
    }));

    return mapped_response;
  }),
  getBranchDetails: protectedProcedure
    .input(z.object({ id: z.string().min(1, "Branch ID is required!") }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.branches.findMany({
        where: eq(branches.id, parseInt(input.id)),
      });
    }),
});
