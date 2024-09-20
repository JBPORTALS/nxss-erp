import { clerkClient } from "@clerk/nextjs/server";

import { CreateOrganizationBackendScheme } from "@nxss/validators";

import { protectedProcedure, router } from "../trpc";

export const institutinsRouter = router({
  create: protectedProcedure
    .input(CreateOrganizationBackendScheme)
    .mutation(async ({ ctx, input }) => {
      const organization = await clerkClient().organizations.createOrganization(
        {
          name: input.name,
          createdBy: ctx.auth.userId,
          publicMetadata: {
            pattern: input.type,
            semester_count: input.semester_count,
          },
        },
      );

      return organization;
    }),
});
