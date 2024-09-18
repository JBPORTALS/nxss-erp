import Link from "next/link";
import { ClerkLoaded, SignUp } from "@clerk/nextjs";

import { Button } from "@nxss/ui/button";

export default function SignUpPage() {
  return (
    <div className="relative grid w-full grow items-center px-4 sm:justify-center">
      <ClerkLoaded>
        <Link href={"/sign-in"}>
          <Button variant={"link"} className="absolute -top-20 right-4">
            Sign in
          </Button>
        </Link>
        <SignUp />
      </ClerkLoaded>
    </div>
  );
}
