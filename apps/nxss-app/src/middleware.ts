import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/clerk(.*)",
]);
const isInvitationRoute = createRouteMatcher(["/accept-invitation(.*)"]);
const isUploadthingRoute = createRouteMatcher(["/api/uploadthing(.*)"]);

export default clerkMiddleware(
  async (auth, request) => {
    const { userId, redirectToSignIn } = auth();

    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);

    if (isInvitationRoute(request)) return NextResponse.next();
    if (isPublicRoute(request)) return NextResponse.next();

    if (isUploadthingRoute(request)) return NextResponse.next({ headers });

    if (!userId && !isPublicRoute(request))
      return redirectToSignIn({ returnBackUrl: request.url });

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
