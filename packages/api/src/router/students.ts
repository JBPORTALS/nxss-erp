import { TRPCError } from "@trpc/server";
import { and, eq, ilike, or } from "drizzle-orm";
import { z } from "zod";

import { insertStudentSchema, Students } from "@nxss/db/schema";

import { protectedProcedure, router } from "../trpc";

export const studentsRouter = router({
  getAll: protectedProcedure
    .input(
      z.object({
        semesterId: z.string().min(1),
        query: z.string().nullable(),
        status: z.enum(["active", "inactive"]).nullable().optional(),
      }),
    )
    .query(({ ctx, input: { semesterId, query, status } }) =>
      ctx.db.query.Students.findMany({
        where: and(
          eq(Students.currentSemesterId, semesterId),
          query ? ilike(Students.email, `%${query}%`) : undefined,
          status ? eq(Students.status, status) : undefined,
        ),
      }),
    ),
  create: protectedProcedure
    .input(insertStudentSchema)
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .insert(Students)
        .values({ ...input, email: input.email.toLowerCase() })
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
