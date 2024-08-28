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
const isUploadthingRoute = createRouteMatcher(["/api/uploadthing(.*)"]);
const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

export default clerkMiddleware(
  async (auth, request) => {
    const { userId, redirectToSignIn, orgRole, sessionClaims } = auth();

    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);

    // For users visiting /onboarding, don't try to redirect
    if (userId && isOnboardingRoute(request)) {
      return NextResponse.next();
    }

    if (isUploadthingRoute(request)) return NextResponse.next({ headers });

    // Catch admin's who do not have `onboardingComplete: true` in their publicMetadata
    // Redirect them to the /onboading route to complete onboarding
    // if (
    //   userId &&
    //   orgRole === "org:admin" &&
    //   !sessionClaims?.metadata?.onboardingComplete
    // ) {
    //   const onboardingUrl = new URL("/onboarding", request.url);
    //   return NextResponse.redirect(onboardingUrl);
    // }

    // If the user isn't signed in and the route is private, redirect to sign-in
    if (!userId && !isPublicRoute(request))
      return redirectToSignIn({ returnBackUrl: request.url });

    //Redirect user to their current selected organization
    if (userId && isHomeRoute(request)) {
      const organizations =
        await clerkClient().users.getOrganizationMembershipList({ userId });

      const org_slug = organizations.data[0]?.organization.slug;
      const org_id = organizations.data[0]?.organization.id;
      const org_name = organizations.data[0]?.organization.name;
      const org_role = organizations.data[0]?.role;

      await clerkClient().users.updateUser(userId, {
        publicMetadata: {
          org_id,
          org_slug,
          org_name,
          org_role,
        },
      });
      return NextResponse.redirect(
        new URL(`/${org_slug}/dashboard`, request.nextUrl.origin),
      );
    }

    return NextResponse.next({ headers });
  },
  {
    signInUrl: "/sign-in",
  },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/",
    "/(api|trpc|uploadthing)(.*)",
  ],
};
