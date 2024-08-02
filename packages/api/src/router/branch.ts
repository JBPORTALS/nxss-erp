import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, eq, schema } from "@nxss/db";
import { CreateBranchScheme, UpdateBranchScheme } from "@nxss/validators";

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
  getDetails: protectedProcedure
    .input(z.object({ id: z.string().min(1, "Branch ID is required!") }))
    .query(async ({ ctx, input }) => {
      const branch_details = await ctx.db.query.branches.findMany({
        where: and(
          eq(branches.id, parseInt(input.id)),
          eq(branches.institution_id, ctx.auth.orgId ?? ""),
        ),
      });

      return branch_details.at(0);
    }),
  updateDetails: protectedProcedure
    .input(UpdateBranchScheme)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(branches)
        .set({
          name: input.name,
          description: input.description,
        })
        .where(
          and(
            eq(branches.id, parseInt(input.id)),
            eq(branches.institution_id, ctx.auth.orgId ?? ""),
          ),
        );
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1, "BranchId is required") }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db
        .delete(branches)
        .where(
          and(
            eq(branches.id, parseInt(input.id)),
            eq(branches.institution_id, ctx.auth.orgId ?? ""),
          ),
        )
        .returning();

      if (!response.at(0)?.id)
        throw new TRPCError({
          message: "Can't able to delete the branch, Retry",
          code: "BAD_REQUEST",
        });

      return response;
    }),
  create: protectedProcedure
    .input(CreateBranchScheme)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.orgId)
        throw new TRPCError({
          message: "No selected organization",
          code: "BAD_REQUEST",
        });

      const response = await ctx.db
        .insert(branches)
        .values({
          name: input.name,
          description: input.description,
          institution_id: ctx.auth.orgId,
        })
        .returning();

      if (!response.at(0)?.id)
        throw new TRPCError({
          message: "Can't able to create the branch, Retry",
          code: "BAD_REQUEST",
        });

      return response;
    }),
});
