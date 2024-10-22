import Link from "next/link";
import { ClerkLoaded, SignIn } from "@clerk/nextjs";

import { Button } from "@nxss/ui/button";

export default function SignInPage() {
  return (
    <div className="relative grid w-full grow items-center px-4 sm:justify-center">
      <ClerkLoaded>
        <Link href={"/sign-up"}>
          <Button variant={"link"} className="absolute -top-40 right-4">
            Create Account
          </Button>
        </Link>
        <SignIn />
      </ClerkLoaded>
    </div>
  );
}
