"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { jwtDecode } from "jwt-decode";
import { Loader2 } from "lucide-react";

import { toast } from "@nxss/ui/toast";

export default function page() {
  const params = useSearchParams();
  const clerk_status = params.get("__clerk_status") as
    | "sign_in"
    | "sign_up"
    | "complete";
  const clerk_ticket = params.get("__clerk_ticket") as string;
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getInvitation = useCallback(async () => {
    if (isLoaded) {
      setIsLoading(true);
      const invitations = await user?.getOrganizationInvitations();
      const jwt_token = jwtDecode<{ sid: string }>(clerk_ticket);
      console.log("jwt", jwt_token);
      const invitation = invitations?.data.find(
        (inv) => inv.id === jwt_token.sid,
      );
      if (invitation?.status === "accepted") {
        toast.info("Already accepted");
        router.push(`/${invitation.publicOrganizationData.slug}/dashboard`);
      } else if (invitation?.status === "pending" && isSignedIn) {
        await invitation.accept();
        router.push(`/${invitation.publicOrganizationData.slug}/dashboard`);
      } else if (invitation?.status === "revoked") {
        toast.error("Invitation has been revoked by admin");
      }
    }
  }, [isLoaded, clerk_ticket]);

  useEffect(() => {
    getInvitation();
  }, [isLoaded]);

  if (clerk_status === "sign_in")
    return (
      <>
        <SignedIn>
          <div className="flex h-screen flex-col items-center justify-center">
            <Loader2 strokeWidth={0.5} className="size-20 animate-spin" />
          </div>
        </SignedIn>
        <SignedOut>
          <SignIn path="/accept-invitation" fallbackRedirectUrl={"/"} />
        </SignedOut>
      </>
    );
  return (
    <SignedOut>
      <SignUp path="/accept-invitatoin" fallbackRedirectUrl={"/"} />
    </SignedOut>
  );
}
