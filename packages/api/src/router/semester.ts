import { z } from "zod";

import { db as DB } from "@nxss/db";
import { insertSemesterSchema, Semesters } from "@nxss/db/schema";

import { router } from "../trpc";

export async function createSemester(
  input: z.infer<typeof insertSemesterSchema>,
  db: typeof DB,
) {
  const response = await db.insert(Semesters).values(input).returning();
  return response[0];
}

export const semesterRouter = router({});
