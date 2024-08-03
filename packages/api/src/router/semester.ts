import { z } from "zod";

import { and, eq, schema } from "@nxss/db";

import { protectedProcedure, router } from "../trpc";

const { branch_to_sem } = schema;

export const semestersRouter = router({
  getStatus: protectedProcedure
    .input(
      z.object({
        semester_id: z.number().min(1),
        branch_id: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.query.branch_to_sem.findFirst({
        where: and(
          eq(branch_to_sem.branch_id, input.branch_id),
          eq(branch_to_sem.semester_id, input.semester_id),
        ),
        columns: {
          status: true,
        },
      });
    }),
});
