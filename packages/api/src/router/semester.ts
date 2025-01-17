import { z } from "zod";

import { insertSemesterSchema, Semesters } from "@nxss/db/schema";

import { Context } from "../context";
import { router } from "../trpc";

export async function createSemester(
  input: z.infer<typeof insertSemesterSchema>,
  db: Context["db"],
) {
  const response = await db.insert(Semesters).values(input).returning();
  return response[0];
}

export const semesterRouter = router({});
