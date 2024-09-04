import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, asc, eq, schema } from "@nxss/db";
import { CreateSemesterScheme, UpdateSemesterScheme } from "@nxss/validators";

import { protectedProcedure, router } from "../trpc";

const { semesters, branch_to_sem } = schema;

export const semestersRouter = router({
  getSemesterList: protectedProcedure.query(async ({ ctx }) => {
    try {
      const semesterList = await ctx.db.query.semesters.findMany({
        where: eq(semesters.institution_id, ctx.auth.orgId ?? ""),
        orderBy: asc(semesters.number),
      });

      return semesterList;
    } catch (error) {
      throw new TRPCError({
        message: "Failed to retrieve semester list",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  }),

  getDetails: protectedProcedure
    .input(z.object({ id: z.string().min(1, "Semester ID is required!") }))
    .query(async ({ ctx, input }) => {
      try {
        const semester_details = await ctx.db.query.semesters.findMany({
          where: and(
            eq(semesters.id, parseInt(input.id)),
            eq(semesters.institution_id, ctx.auth.orgId ?? ""),
          ),
        });

        return semester_details.at(0);
      } catch (error) {
        throw new TRPCError({
          message: "Failed to retrieve semester details",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  updateDetails: protectedProcedure
    .input(UpdateSemesterScheme)
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await ctx.db
          .update(semesters)
          .set({
            number: input.number,
            // Include other fields if necessary
          })
          .where(
            and(
              eq(semesters.id, input.id),
              eq(semesters.institution_id, ctx.auth.orgId ?? ""),
            ),
          )
          .returning();

        if (!response[0]?.id) {
          throw new TRPCError({
            message: "Unable to update the semester, please retry",
            code: "BAD_REQUEST",
          });
        }

        return response[0];
      } catch (error) {
        throw new TRPCError({
          message: "Failed to update semester details",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1, "SemesterId is required") }))
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await ctx.db
          .delete(semesters)
          .where(
            and(
              eq(semesters.id, parseInt(input.id)),
              eq(semesters.institution_id, ctx.auth.orgId ?? ""),
            ),
          )
          .returning();

        if (!response.at(0)?.id) {
          throw new TRPCError({
            message: "Unable to delete the semester, please retry",
            code: "BAD_REQUEST",
          });
        }

        return response;
      } catch (error) {
        throw new TRPCError({
          message: "Failed to delete semester",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  create: protectedProcedure
    .input(CreateSemesterScheme)
    .mutation(async ({ ctx, input }) => {
      try {
        if (!ctx.auth.orgId) {
          throw new TRPCError({
            message: "No selected organization",
            code: "BAD_REQUEST",
          });
        }

        const response = await ctx.db
          .insert(semesters)
          .values({
            number: input.number,
            institution_id: ctx.auth.orgId,
            branch_id: input.branch_id, // Ensure branch_id is included
          })
          .returning();

        if (!response.at(0)?.id) {
          throw new TRPCError({
            message: "Unable to create the semester, please retry",
            code: "BAD_REQUEST",
          });
        }

        return response;
      } catch (error) {
        throw new TRPCError({
          message: "Failed to create semester",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),

  getStatus: protectedProcedure
    .input(
      z.object({
        semester_id: z.number().min(1),
        branch_id: z.number().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const status = await ctx.db.query.branch_to_sem.findFirst({
          where: and(
            eq(branch_to_sem.branch_id, input.branch_id),
            eq(branch_to_sem.semester_id, input.semester_id),
          ),
          columns: {
            status: true,
          },
        });

        if (!status) {
          throw new TRPCError({
            message: "Status not found",
            code: "NOT_FOUND",
          });
        }

        return status;
      } catch (error) {
        throw new TRPCError({
          message: "Failed to retrieve status",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
