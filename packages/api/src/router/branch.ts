import { eq, schema } from "@nxss/db";

import { protectedProcedure, router } from "../trpc";

const { branches } = schema;

export const branchesRouter = router({
  getBranchList: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.branches.findMany({
      where: eq(branches.institution_id, ctx.auth.orgId ?? ""),
      with: {
        semesters: {
          columns: {
            number: true,
          },
        },
      },
    });
  }),
});
