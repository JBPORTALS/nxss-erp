import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { asc, eq, inArray, schema, sql } from "@nxss/db";

import { protectedProcedure, router } from "../trpc";

const { sections, batches, students } = schema;

// Update the schema definitions
const BatchSchema = z.object({
  batch_id: z.number(),
  batch_name: z.string(),
  student_count: z.number(),
});

const SectionSchema = z.object({
  section_id: z.number(),
  section_name: z.string(),
  batches: z.array(BatchSchema),
  students_count: z.number(),
});

export const GetSectionsAndBatchesSchema = z.array(SectionSchema);

export type SectionWithBatches = z.infer<typeof SectionSchema>;
export type GetSectionsAndBatchesResult = z.infer<
  typeof GetSectionsAndBatchesSchema
>;

export const sectionsRouter = router({
  getSectionsAndBatches: protectedProcedure
    .input(z.number())
    .query(
      async ({
        ctx,
        input: semesterId,
      }): Promise<GetSectionsAndBatchesResult> => {
        const { db } = ctx;

        try {
          const sectionsResult = await db
            .select({ section_id: sections.id, section_name: sections.name })
            .from(sections)
            .where(eq(sections.semester_id, semesterId))
            .orderBy(asc(sections.name));

          // Combine sections with their batches
          const result = await Promise.all(
            sectionsResult.map(async (section) => {
              const batchesResult = await db
                .select({
                  batch_id: batches.id,
                  batch_name: batches.name,
                  section_id: batches.section_id,
                  student_count: sql`COUNT(${students.id})`.as<number>(),
                })
                .from(batches)
                .leftJoin(students, eq(students.batch_id, batches.id))
                .where(eq(batches.section_id, section.section_id))
                .groupBy(batches.id, batches.name, batches.section_id)
                .orderBy(asc(batches.name));

              return {
                section_id: section.section_id,
                section_name: section.section_name,
                students_count: batchesResult
                  .map((batch) => parseInt(batch.student_count.toString()))
                  .reduce((prev, acc) => prev + acc),
                batches: batchesResult,
              };
            }),
          );

          return result;
        } catch (error) {
          console.error("Error in getSectionsAndBatches:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "An error occurred while fetching sections and batches",
          });
        }
      },
    ),
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input: sectionId }) => {
      const { db } = ctx;

      try {
        // Get batches associated with this section
        const batchesInSection = await db
          .select({ id: batches.id })
          .from(batches)
          .where(eq(batches.section_id, sectionId));

        // Update students to remove batch association
        if (batchesInSection.length > 0) {
          await db
            .update(students)
            .set({ batch_id: null, updated_at: new Date() })
            .where(
              eq(
                students.batch_id,
                sql`ANY(${batchesInSection.map((b) => b.id)})`,
              ),
            );
        }

        // Delete the section (this will cascade delete the batches)
        const deletedSection = await db
          .delete(sections)
          .where(eq(sections.id, sectionId))
          .returning();

        if (deletedSection.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Section not found",
          });
        }

        return {
          message: "Section and associated batches deleted successfully",
        };
      } catch (error) {
        console.error("Error in delete:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while deleting the section",
        });
      }
    }),
  getDetails: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input: sectionId }) => {
      const { db } = ctx;

      try {
        const sectionDetails = await db.query.sections.findFirst({
          where: eq(sections.id, sectionId),
          with: {
            batches: {
              with: {
                students: true,
              },
            },
          },
        });

        if (!sectionDetails) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Section not found",
          });
        }

        return {
          ...sectionDetails,
        };
      } catch (error) {
        console.error("Error in getDetails:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching section details",
        });
      }
    }),

  rename: protectedProcedure
    .input(
      z.object({
        sectionId: z.number(),
        newName: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { sectionId, newName } = input;

      try {
        const updatedSection = await db
          .update(sections)
          .set({ name: newName, updated_at: new Date() })
          .where(eq(sections.id, sectionId))
          .returning();

        if (updatedSection.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Section not found",
          });
        }

        return updatedSection[0];
      } catch (error) {
        console.error("Error in rename:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while renaming the section",
        });
      }
    }),
});

// Export the router type for use in the main app router
export type SectionsRouter = typeof sectionsRouter;
