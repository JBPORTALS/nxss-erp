import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="relative grid w-full grow items-center px-4 sm:justify-center">
      <ClerkLoading>
        <LoaderCircle strokeWidth={1} className="size-12 animate-spin" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignUp />
      </ClerkLoaded>
    </div>
  );
}
