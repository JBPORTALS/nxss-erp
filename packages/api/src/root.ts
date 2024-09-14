import { authRouter } from "./router/auth";
import { batchesRouter } from "./router/batches";
import { branchesRouter } from "./router/branch";
import { calendarRouter } from "./router/calendar";
import { sectionsRouter } from "./router/sections";
import { semestersRouter } from "./router/semester";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  branch: branchesRouter,
  semester: semestersRouter,
  calendar: calendarRouter,
  batches: batchesRouter,
  sections: sectionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
