import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { env } from "./env";

// Set the homepage as a public route
const isPublicRoute = createRouteMatcher(["/"]);

// Set the necessary options for a satellite application
const options = {
  isSatellite: true,
  signInUrl: env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  domain: env.NEXT_PUBLIC_CLERK_DOMAIN,
};

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return; // if it's a public route, do nothing
  auth().protect(); // for any other route, require auth
}, options);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
