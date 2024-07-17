import { NextResponse } from "next/server";
import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isPublicRoutes = createRouteMatcher(["/sign-in"]);
const isHomeRoute = createRouteMatcher(["/"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);
const isIvitationRoute = createRouteMatcher(["/invite(.*)"]);

export default clerkMiddleware(
  async (auth, request) => {
    const { userId, redirectToSignIn, sessionClaims } = auth();

    if (!isPublicRoutes(request) && !isIvitationRoute(request) && !userId) {
      return redirectToSignIn({ returnBackUrl: request.url });
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
