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

export default clerkMiddleware(
  async (auth, request) => {
    const { userId, redirectToSignIn } = auth();

    if (isUploadthingRoute(request)) return NextResponse.next();

    // If the user isn't signed in and the route is private, redirect to sign-in
    if (!userId && !isPublicRoute(request))
      return redirectToSignIn({ returnBackUrl: request.url });

    //Redirect user to their current selected organization
    if (userId && isHomeRoute(request)) {
      const organizations =
        await clerkClient().users.getOrganizationMembershipList({ userId });

      const orgSlug = organizations.data[0]?.organization.slug;
      const orgId = organizations.data[0]?.organization.id;

      await clerkClient().users.updateUser(userId, {
        publicMetadata: {
          orgSlug,
          orgId,
        },
      });
      return NextResponse.redirect(
        new URL(`/${orgSlug}/dashboard`, request.nextUrl.origin),
      );
    }
  },
  {
    signInUrl: "/sign-in",
  },
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc|uploadthing)(.*)"],
};
