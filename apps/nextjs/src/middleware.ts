import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoutes = createRouteMatcher(["/sign-in"]);

export default clerkMiddleware(
  async (auth, request) => {
    if (!isPublicRoutes(request)) {
      auth().protect();
    }
  },
  {
    signInUrl: "/sign-in",
    afterSignInUrl: "/sign-in",
  },
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
