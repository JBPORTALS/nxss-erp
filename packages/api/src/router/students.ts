import { eq } from "drizzle-orm";
import { z } from "zod";

import { Students } from "@nxss/db/schema";

import { protectedProcedure, router } from "../trpc";

export const studentsRouter = router({
  getAll: protectedProcedure
    .input(z.object({ semesterId: z.string().min(1) }))
    .query(({ ctx, input }) =>
      ctx.db.query.Students.findMany({
        where: eq(Students.currentSemesterId, input.semesterId),
      }),
    ),
});
