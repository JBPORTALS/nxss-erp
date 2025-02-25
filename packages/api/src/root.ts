import { authRouter } from "./router/auth";
import { batchesRouter } from "./router/batches";
import { branchesRouter } from "./router/branch";
// import { calendarRouter } from "./router/calendar";
import { institutinsRouter } from "./router/institution";
// import { sectionsRouter } from "./router/sections";
import { semesterRouter } from "./router/semester";
import { studentsRouter } from "./router/students";
import { subjectsRouter } from "./router/subjects";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  branches: branchesRouter,
  institution: institutinsRouter,
  // calendar: calendarRouter,
  batches: batchesRouter,
  // sections: sectionsRouter,
  students: studentsRouter,
  semester: semesterRouter,
  subjects: subjectsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
