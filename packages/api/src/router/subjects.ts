import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { insertSubjectSchema, Subjects } from "@nxss/db/schema";

import { protectedProcedure, router } from "../trpc";

export const subjectsRouter = router({
  create: protectedProcedure
    .input(insertSubjectSchema)
    .mutation(async ({ ctx, input }) => {
      const subject = await ctx.db
        .insert(Subjects)
        .values(input)
        .returning()
        .then((res) => res[0]);
      if (!subject)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create subject",
        });
      return subject;
    }),
  getAll: protectedProcedure
    .input(insertSubjectSchema.pick({ semesterId: true }))
    .query(({ ctx, input }) =>
      ctx.db.query.Subjects.findMany({
        where: eq(Subjects.semesterId, input.semesterId),
        orderBy: desc(Subjects.createdAt),
      }),
    ),

  getById: protectedProcedure
    .input(z.object({ subjectId: z.string().min(1) }))
    .query(({ ctx, input }) =>
      ctx.db.query.Subjects.findFirst({
        where: eq(Subjects.id, input.subjectId),
      }),
    ),
});
