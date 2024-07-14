import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isPublicRoutes = createRouteMatcher(["/sign-in"]);

export default clerkMiddleware(
  async (auth, request) => {
    const userId = auth().userId;
    if (!isPublicRoutes(request)) {
      auth().protect();
    }

    //if it matches public routes and authenticated. push to current organization
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
    afterSignInUrl: "/sign-in",
  },
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
