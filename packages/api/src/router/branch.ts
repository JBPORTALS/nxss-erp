import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, asc, eq, schema } from "@nxss/db";
import {
  insertBranchSchema,
  Semesters,
  updateBranchSchema,
} from "@nxss/db/schema";

import { protectedProcedure, router } from "../trpc";

const { Branches } = schema;

export const branchesRouter = router({
  getBranchList: protectedProcedure
    .input(z.object({ orgId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      try {
        const branchList = await ctx.db.query.Branches.findMany({
          where: eq(Branches.clerkInstitutionId, input.orgId),
          orderBy: asc(Branches.title),
          with: {
            Semesters: {
              where: eq(Semesters.status, "active"),
              orderBy: asc(Semesters.number),
            },
          },
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
        with: {
          Semesters: {
            where: eq(Semesters.status, "active"),
            orderBy: asc(Semesters.number),
          },
        },
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

        const branchResponse = await tx
          .insert(Branches)
          .values({
            title: input.title,
            clerkInstitutionId: ctx.auth.orgId,
            noOfSemesters: input.noOfSemesters,
          })
          .returning();

        const branch = branchResponse.at(0);

        if (!branch?.id)
          throw new TRPCError({
            message: "Can't able to create the branch, Retry",
            code: "INTERNAL_SERVER_ERROR",
          });

        //Create active semesters
        const semesters = await Promise.all(
          Array.from({ length: branch?.noOfSemesters }).map((_, index) => {
            const semesterIndex = index + 1;

            return tx
              .insert(Semesters)
              .values({
                status:
                  input.semesterStartsWith === "even" && semesterIndex % 2 === 0
                    ? "active"
                    : input.semesterStartsWith === "odd" &&
                        semesterIndex % 2 !== 0
                      ? "active"
                      : "inactive",
                number: semesterIndex,
                branchId: branch?.id,
              })
              .returning();
          }),
        );

        if (semesters.length !== 6)
          throw new TRPCError({
            message: "Can't able to create the branch, Retry",
            code: "INTERNAL_SERVER_ERROR",
          });

        return branch;
      });

      return response;
    }),
});
