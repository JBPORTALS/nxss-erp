import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, asc, eq, schema } from "@nxss/db";
import { insertBranchSchema, updateBranchSchema } from "@nxss/db/schema";

import { protectedProcedure, router } from "../trpc";
import { createSemester } from "./semester";

const { Branches } = schema;

export const branchesRouter = router({
  getBranchList: protectedProcedure.query(async ({ ctx }) => {
    try {
      const branchList = await ctx.db.query.Branches.findMany({
        where: eq(Branches.clerkInstitutionId, ctx.auth.orgId ?? ""),
        orderBy: asc(Branches.name),
      });
      return branchList;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }),

  getDetails: protectedProcedure
    .input(z.object({ id: z.string().min(1, "Branch ID is required!") }))
    .query(async ({ ctx, input }) => {
      const branch_details = await ctx.db.query.Branches.findMany({
        where: and(
          eq(Branches.id, input.id),
          eq(Branches.clerkInstitutionId, ctx.auth.orgId ?? ""),
        ),
      });

      return branch_details.at(0);
    }),

  updateDetails: protectedProcedure
    .input(updateBranchSchema)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(Branches)
        .set(input)
        .where(
          and(
            eq(Branches.id, input.id),
            eq(Branches.clerkInstitutionId, ctx.auth.orgId ?? ""),
          ),
        );
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1, "BranchId is required") }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db
        .delete(Branches)
        .where(
          and(
            eq(Branches.id, input.id),
            eq(Branches.clerkInstitutionId, ctx.auth.orgId ?? ""),
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
    .input(insertBranchSchema)
    .mutation(async ({ ctx, input }) => {
      //transaction
      const response = await ctx.db.transaction(async (tx) => {
        if (!ctx.auth.orgId)
          throw new TRPCError({
            message: "No selected organization",
            code: "BAD_REQUEST",
          });

        const branchResponse = await ctx.db
          .insert(Branches)
          .values({
            name: input.name,
            clerkInstitutionId: ctx.auth.orgId,
            semesters: input.semesters,
          })
          .returning();

        const branch = branchResponse.at(0);

        if (!branch?.id)
          throw new TRPCError({
            message: "Can't able to create the branch, Retry",
            code: "BAD_REQUEST",
          });

        //Create active semesters
        await Promise.all(
          new Array(branch?.semesters).map(async (_, index) => {
            const semester = index + 1;
            if (input.semesterStartsWith === "even" && semester % 2 === 0)
              await createSemester(
                {
                  status: "active",
                  number: index + 1,
                  brancId: branch?.id,
                },
                ctx.db,
              );
            else if (input.semesterStartsWith === "odd" && semester % 2 !== 0)
              await createSemester(
                {
                  status: "active",
                  number: index + 1,
                  brancId: branch?.id,
                },
                ctx.db,
              );
          }),
        );

        return branch;
      });

      return response;
    }),
});
