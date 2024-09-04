import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, asc, eq, schema } from "@nxss/db";
import { CreateBatchScheme, UpdateBatchScheme } from "@nxss/validators";
import { protectedProcedure, router } from "../trpc";

const { batches, branches, semesters, sections } = schema;

export const batchesRouter = router({
  getBatchList: protectedProcedure.query(async ({ ctx }) => {
    const batchList = await ctx.db.query.batches.findMany({
      orderBy: asc(batches.name),
      with: {
        branch: true,
        semester: true,
        section: true,
      },
    });

    return batchList;
  }),

  getDetails: protectedProcedure
    .input(z.object({ id: z.string().min(1, "Batch ID is required!") }))
    .query(async ({ ctx, input }) => {
      const batchDetails = await ctx.db.query.batches.findFirst({
        where: eq(batches.id, parseInt(input.id)),
        with: {
          branch: true,
          semester: true,
          section: true,
        },
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
    .input(UpdateBatchScheme)
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db
        .update(batches)
        .set({
          name: input.name,
          branch_id: input.branch_id,
          semester_id: input.semester_id,
          section_id: input.section_id,
        })
        .where(eq(batches.id, input.id))
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
        .delete(batches)
        .where(eq(batches.id, parseInt(input.id)))
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
    .input(CreateBatchScheme)
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db
        .insert(batches)
        .values({
          name: input.name,
          branch_id: input.branch_id,
          semester_id: input.semester_id,
          section_id: input.section_id,
        })
        .returning();

      if (!response.at(0)?.id) {
        throw new TRPCError({
          message: "Unable to create the batch, please retry",
          code: "BAD_REQUEST",
        });
      }

      return response.at(0);
    }),

  getBatchesByBranchAndSemester: protectedProcedure
    .input(
      z.object({
        branch_id: z.number().min(1),
        semester_id: z.number().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const batchList = await ctx.db.query.batches.findMany({
        where: and(
          eq(batches.branch_id, input.branch_id),
          eq(batches.semester_id, input.semester_id)
        ),
        orderBy: asc(batches.name),
      });

      return batchList;
    }),
});
