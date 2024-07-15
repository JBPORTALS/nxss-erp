import { NextResponse } from "next/server";
import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isPublicRoutes = createRouteMatcher(["/sign-in"]);
const isHomeRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(
  async (auth, request) => {
    const userId = auth().userId;
    if (!isPublicRoutes(request)) {
      auth().protect({
        unauthenticatedUrl: new URL(
          "/sign-in",
          request.nextUrl.origin,
        ).toString(),
      });
    }

    //if user authencted and visit the publicRoutes redirect to dashboard
    if (isPublicRoutes(request) && userId) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    //if it matches public routes and authenticated. push to current organization
    if (userId && isHomeRoute(request)) {
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
