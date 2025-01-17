import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { asc, eq, schema } from "@nxss/db";
import { insertBatchSchema, updateBatchSchema } from "@nxss/db/schema";

import { protectedProcedure, router } from "../trpc";

const { Batches } = schema;

export const batchesRouter = router({
  getBatchList: protectedProcedure
    .input(z.object({ sectionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const batchList = await ctx.db.query.Batches.findMany({
        orderBy: asc(Batches.name),
        where: eq(Batches.sectionId, input.sectionId),
      });

      return batchList;
    }),

  getDetails: protectedProcedure
    .input(z.string().min(1, "Batch ID is required!"))
    .query(async ({ ctx, input }) => {
      const batchDetails = await ctx.db.query.Batches.findFirst({
        where: eq(Batches.id, input),
      });

      if (!batchDetails) {
        throw new TRPCError({
          message: "Batch not found",
          code: "NOT_FOUND",
        });
      }

      return batchDetails;
    }),

  updateDetails: protectedProcedure
    .input(updateBatchSchema)
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db
        .update(Batches)
        .set(input)
        .where(eq(Batches.id, input.id))
        .returning();

      if (!response.at(0)?.id) {
        throw new TRPCError({
          message: "Unable to update the batch, please retry",
          code: "BAD_REQUEST",
        });
      }

      return response.at(0);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1, "Batch ID is required") }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db
        .delete(Batches)
        .where(eq(Batches.id, input.id))
        .returning();

      if (!response.at(0)?.id) {
        throw new TRPCError({
          message: "Unable to delete the batch, please retry",
          code: "BAD_REQUEST",
        });
      }

      return response.at(0);
    }),

  create: protectedProcedure
    .input(insertBatchSchema)
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db.insert(Batches).values(input).returning();

      if (!response.at(0)?.id) {
        throw new TRPCError({
          message: "Unable to create the batch, please retry",
          code: "BAD_REQUEST",
        });
      }

      return response.at(0);
    }),

  // getBatchesByBranchAndSemester: protectedProcedure
  //   .input(
  //     z.object({
  //       branchId: z.number().min(1),
  //       semesterId: z.number().min(1),
  //     }),
  //   )
  //   .query(async ({ ctx, input }) => {
  //     const batchList = await ctx.db.query.Batches.findMany({
  //       where:
  //         eq(Batches.sectionId, input.se)
  //       ,
  //       orderBy: asc(Batches.name),
  //     });

  //     return batchList;
  //   }),
});
