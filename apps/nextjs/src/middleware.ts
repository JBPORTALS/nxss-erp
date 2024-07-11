import { NextResponse } from "next/server";
import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isProtectedRoutes = createRouteMatcher(["/dashboard(.*)"]);
const isPublicRoutes = createRouteMatcher(["/sign-in(.*)"]);

export default clerkMiddleware(
  async (auth, request) => {
    if (isProtectedRoutes(request)) {
      auth().protect();
    }

    const userId = auth().userId;

    if (userId && isPublicRoutes(request)) {
      const organizations =
        await clerkClient().users.getOrganizationMembershipList({ userId });

      const orgslug = organizations.data[0]?.organization.slug;
      return NextResponse.redirect(
        new URL(`/${orgslug}/dashboard`, request.nextUrl.origin),
      );
    }
  },
  {
    signInUrl: "/sign-in",
  },
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
