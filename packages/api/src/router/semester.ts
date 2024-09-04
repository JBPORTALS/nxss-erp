import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, asc, eq, schema } from "@nxss/db";
import { CreateSemesterScheme, UpdateSemesterScheme } from "@nxss/validators";
import { protectedProcedure, router } from "../trpc";

const { semesters, branch_to_sem } = schema;

export const semestersRouter = router({
  getSemesterList: protectedProcedure.query(async ({ ctx }) => {
    const semesterList = await ctx.db.query.semesters.findMany({
      where: eq(semesters.institution_id, ctx.auth.orgId ?? ""),
      orderBy: asc(semesters.number),
    });

    return semesterList;
  }),

  getDetails: protectedProcedure
    .input(z.object({ id: z.string().min(1, "Semester ID is required!") }))
    .query(async ({ ctx, input }) => {
      const semester_details = await ctx.db.query.semesters.findMany({
        where: and(
          eq(semesters.id, parseInt(input.id)),
          eq(semesters.institution_id, ctx.auth.orgId ?? "")
        ),
      });

      return semester_details.at(0);
    }),

  updateDetails: protectedProcedure
    .input(UpdateSemesterScheme)
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(semesters)
        .set({
          number: input.number,
        })
        .where(
          and(
            eq(semesters.id, input.id),
            eq(semesters.institution_id, ctx.auth.orgId ?? "")
          )
        );
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1, "SemesterId is required") }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db
        .delete(semesters)
        .where(
          and(
            eq(semesters.id, parseInt(input.id)),
            eq(semesters.institution_id, ctx.auth.orgId ?? "")
          )
        )
        .returning();

      if (!response.at(0)?.id)
        throw new TRPCError({
          message: "Unable to delete the semester, please retry",
          code: "BAD_REQUEST",
        });

      return response;
    }),

  create: protectedProcedure
    .input(CreateSemesterScheme)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.orgId)
        throw new TRPCError({
          message: "No selected organization",
          code: "BAD_REQUEST",
        });

      const response = await ctx.db
        .insert(semesters)
        .values({
          number: input.number,
          institution_id: ctx.auth.orgId,
        })
        .returning();

      if (!response.at(0)?.id)
        throw new TRPCError({
          message: "Unable to create the semester, please retry",
          code: "BAD_REQUEST",
        });

      return response;
    }),

  getStatus: protectedProcedure
    .input(
      z.object({
        semester_id: z.number().min(1),
        branch_id: z.number().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.query.branch_to_sem.findFirst({
        where: and(
          eq(branch_to_sem.branch_id, input.branch_id),
          eq(branch_to_sem.semester_id, input.semester_id)
        ),
        columns: {
          status: true,
        },
      });
    }),
});