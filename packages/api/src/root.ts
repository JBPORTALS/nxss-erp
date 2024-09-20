import { authRouter } from "./router/auth";
import { batchesRouter } from "./router/batches";
import { branchesRouter } from "./router/branch";
import { calendarRouter } from "./router/calendar";
import { institutinsRouter } from "./router/institution";
import { sectionsRouter } from "./router/sections";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  branch: branchesRouter,
  institution: institutinsRouter,
  calendar: calendarRouter,
  batches: batchesRouter,
  sections: sectionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
