import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { insertStudentSchema, Students } from "@nxss/db/schema";

import { protectedProcedure, router } from "../trpc";

export const studentsRouter = router({
  getAll: protectedProcedure
    .input(z.object({ semesterId: z.string().min(1) }))
    .query(({ ctx, input }) =>
      ctx.db.query.Students.findMany({
        where: eq(Students.currentSemesterId, input.semesterId),
      }),
    ),
  create: protectedProcedure
    .input(insertStudentSchema)
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .insert(Students)
        .values(input)
        .returning()
        .then((res) => res.at(0));

      if (!res)
        throw new TRPCError({
          message: `Can't able to add ${input.email}`,
          code: "INTERNAL_SERVER_ERROR",
        });
      return res;
    }),
});
