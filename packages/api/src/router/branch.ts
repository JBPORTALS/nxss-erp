import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, asc, eq, schema } from "@nxss/db";
import {
  insertBranchSchema,
  Semesters,
  updateBranchSchema,
} from "@nxss/db/schema";

import { protectedProcedure, router } from "../trpc";
import { createSemester } from "./semester";

const { Branches } = schema;

export const branchesRouter = router({
  getBranchList: protectedProcedure
    .input(z.object({ orgId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      try {
        const branchList = await ctx.db.query.Branches.findMany({
          where: eq(Branches.clerkInstitutionId, input.orgId),
          orderBy: asc(Branches.name),
        });
        const mappedBranchList = branchList.map((branch) => {
          const semesters = branch.semesters;

          return {
            ...branch,
            Semester: Array.from({ length: semesters }).map((_, i) => ({
              id: (i + 1).toString(),
            })),
          };
        });

        return mappedBranchList;
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
      const mappedBranchList = branch_details.map((branch) => {
        const semesters = branch.semesters;

        return {
          ...branch,
          Semesters: Array.from({ length: semesters }).map((_, i) => ({
            id: (i + 1).toString(),
          })),
        };
      });

      return mappedBranchList.at(0);
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

        const branchResponse = await tx
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
          Array.from({ length: branch?.semesters }).map((_, index) => {
            const semester = index + 1;
            if (input.semesterStartsWith === "even" && semester % 2 == 0)
              return tx
                .insert(Semesters)
                .values({
                  status: "active",
                  number: semester,
                  brancId: branch?.id,
                })
                .returning();
            else if (input.semesterStartsWith === "odd" && semester % 2 != 0)
              return tx
                .insert(Semesters)
                .values({
                  status: "active",
                  number: semester,
                  brancId: branch?.id,
                })
                .returning();
          }),
        );

        return branch;
      });

      return response;
    }),
});
