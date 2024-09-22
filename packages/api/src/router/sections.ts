import { z } from "zod";

import { schema, sql } from "@nxss/db";

import { protectedProcedure, router } from "../trpc";

const { sections, batches, students } = schema;

const BatchSchema = z.object({
  id: z.number(),
  name: z.string(),
  studentCount: z.number(),
  studentNames: z.string().nullable(),
});

export const SectionSchema = z.object({
  section_id: z.number(),
  section_name: z.string(),
  batches: z.array(BatchSchema),
  total_students: z.number(),
});

export const GetSectionsAndBatchesSchema = z.array(SectionSchema);

export type SectionWithBatches = z.infer<typeof SectionSchema>;
export type GetSectionsAndBatchesResult = z.infer<
  typeof GetSectionsAndBatchesSchema
>;

export const sectionsRouter = router({
  getSectionsAndBatches: protectedProcedure
    .input(z.number())
    .output(GetSectionsAndBatchesSchema)
    .query(async ({ ctx, input }): Promise<GetSectionsAndBatchesResult> => {
      const { db } = ctx;

      const result = await db.execute(sql`
      WITH section_data AS (
        SELECT 
          s.id AS section_id,
          s.name AS section_name,
          b.id AS batch_id,
          b.name AS batch_name,
          COUNT(st.id) AS student_count,
          STRING_AGG(st.full_name, ', ') AS student_names
        FROM ${sections} s
        LEFT JOIN ${batches} b ON s.id = b.section_id
        LEFT JOIN ${students} st ON st.batch_id = b.id
        WHERE s.semester_id = ${input}
        GROUP BY s.id, s.name, b.id, b.name
      )
      SELECT 
        section_id,
        section_name,
        COALESCE(JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', batch_id,
            'name', batch_name,
            'studentCount', student_count,
            'studentNames', student_names
          )
        ) FILTER (WHERE batch_id IS NOT NULL), '[]'::json) AS batches,
        COALESCE(SUM(student_count), 0) AS total_students
      FROM section_data
      GROUP BY section_id, section_name
      ORDER BY section_name
    `);

      return result.rows.map((row) => ({
        ...row,
        batches: row.batches.map((batch) => ({
          ...batch,
          studentCount: Number(batch.studentCount),
        })),
        total_students: Number(row.total_students),
      })) as GetSectionsAndBatchesResult;
    }),
});

// Export the router type for use in the main app router
export type SectionsRouter = typeof sectionsRouter;
