import { NextResponse } from "next/server";
import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/api/clerk(.*)",
  "/invite(.*)",
]);
const isHomeRoute = createRouteMatcher(["/"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

export default clerkMiddleware(
  async (auth, request) => {
    const { userId, redirectToSignIn, sessionClaims } = auth();

    // For users visiting /onboarding, don't try to redirect
    if (userId && isOnboardingRoute(request)) {
      return NextResponse.next();
    }

    // If the user isn't signed in and the route is private, redirect to sign-in
    if (!userId && !isPublicRoute(request))
      return redirectToSignIn({ returnBackUrl: request.url });

    // Catch users who do not have `onboardingComplete: true` in their publicMetadata
    // Redirect them to the /onboading route to complete onboarding
    if (
      userId &&
      !isPublicRoute(request) &&
      !sessionClaims?.metadata?.onboardingComplete
    ) {
      const onboardingUrl = new URL("/onboarding", request.nextUrl.origin);
      return NextResponse.redirect(onboardingUrl);
    }

    //Redirect user to their current selected organization
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
  },
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
