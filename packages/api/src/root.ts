import { authRouter } from "./router/auth";
import { branchesRouter } from "./router/branch";
import { organizationRouter } from "./router/organization";
import { postRouter } from "./router/post";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  post: postRouter,
  organization: organizationRouter,
  branch: branchesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
