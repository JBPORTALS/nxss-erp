import { batches, sections } from "../../db/src/schema/auth";
import { authRouter } from "./router/auth";
import { batchesRouter } from "./router/batches";
import { branchesRouter } from "./router/branch";
import { calendarRouter } from "./router/calendarofevents";
import { organizationRouter } from "./router/organization";
import { postRouter } from "./router/post";
import { sectionsRouter } from "./router/sections";
import { semestersRouter } from "./router/semester";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  post: postRouter,
  organization: organizationRouter,
  branch: branchesRouter,
  semester: semestersRouter,
  sections:sectionsRouter,
  batches:batchesRouter,
  calendarOfEvents :calendarRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
