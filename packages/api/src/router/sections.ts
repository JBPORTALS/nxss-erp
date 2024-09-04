import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, asc, eq, schema } from "@nxss/db";
import { CreateSectionScheme, UpdateSectionScheme } from "@nxss/validators";

import { protectedProcedure, router } from "../trpc";

const { sections, branches, semesters } = schema;

export const sectionsRouter = router({
  getSectionList: protectedProcedure.query(async ({ ctx }) => {
    const sectionList = await ctx.db.query.sections.findMany({
      orderBy: asc(sections.name),
      with: {
        branch: true,
        semester: true,
      },
    });

    return sectionList;
  }),

  getDetails: protectedProcedure
    .input(z.object({ id: z.string().min(1, "Section ID is required!") }))
    .query(async ({ ctx, input }) => {
      const section_details = await ctx.db.query.sections.findFirst({
        where: eq(sections.id, parseInt(input.id)),
        with: {
          branch: true,
          semester: true,
        },
      });

      if (!section_details) {
        throw new TRPCError({
          message: "Section not found",
          code: "NOT_FOUND",
        });
      }

      return section_details;
    }),

  updateDetails: protectedProcedure
    .input(UpdateSectionScheme)
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db
        .update(sections)
        .set({
          name: input.name,
          branch_id: input.branch_id,
          semester_id: input.semester_id,
        })
        .where(eq(sections.id, input.id))
        .returning();

      if (!response.at(0)?.id) {
        throw new TRPCError({
          message: "Unable to update the section, please retry",
          code: "BAD_REQUEST",
        });
      }

      return response.at(0);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1, "SectionId is required") }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db
        .delete(sections)
        .where(eq(sections.id, parseInt(input.id)))
        .returning();

      if (!response.at(0)?.id) {
        throw new TRPCError({
          message: "Unable to delete the section, please retry",
          code: "BAD_REQUEST",
        });
      }

      return response.at(0);
    }),

  create: protectedProcedure
    .input(CreateSectionScheme)
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db
        .insert(sections)
        .values({
          name: input.name,
          branch_id: input.branch_id,
          semester_id: input.semester_id,
        })
        .returning();

      if (!response.at(0)?.id) {
        throw new TRPCError({
          message: "Unable to create the section, please retry",
          code: "BAD_REQUEST",
        });
      }

      return response.at(0);
    }),

  getSectionsByBranchAndSemester: protectedProcedure
    .input(
      z.object({
        branch_id: z.number().min(1),
        semester_id: z.number().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const sectionList = await ctx.db.query.sections.findMany({
        where: and(
          eq(sections.branch_id, input.branch_id),
          eq(sections.semester_id, input.semester_id),
        ),
        orderBy: asc(sections.name),
      });

      return sectionList;
    }),
});
