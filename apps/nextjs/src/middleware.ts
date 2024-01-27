import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // publicRoutes: ["/", "/sign-in"],
  // ignoredRoutes: ["/((?!api|trpc))(_next.*|.+.[w]+$)", "/"],
  // afterAuth(auth, req, evt) {
  //   if (!auth.orgId)
  //     NextResponse.redirect(new NextURL("/create-organization", req.url));
  //   return NextResponse.next();
  // },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
