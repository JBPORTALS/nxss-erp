import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { parse, useURL } from "expo-linking";
import { useClerk, useSignUp } from "@clerk/clerk-expo";
import { jwtDecode } from "jwt-decode";

export default function AcceptInvitation() {
  const url = useURL();
  const {
    isLoaded: isSignupLoaded,
    setActive: setSignupActive,
    signUp,
  } = useSignUp();
  const [signUpStatus, setSignupStatus] = useState("start");
  const [isLoading, setIsLoading] = useState(false);
  const { getOrganization, loaded: isClerkLoaded, organization } = useClerk();

  const { queryParams } = url ? parse(url) : { queryParams: undefined };
  const clerk_status = queryParams?.__clerk_status;
  const clerk_ticket = queryParams?.__clerk_ticket;

  // Always define the handleSignUp callback
  const handleSignUp = useCallback(async () => {
    if (
      clerk_status === "sign_up" &&
      isSignupLoaded &&
      clerk_ticket &&
      isClerkLoaded
    ) {
      setIsLoading(true);
      try {
        // Decode the token
        const token = jwtDecode<{ oid: string; sid: string; iid: string }>(
          clerk_ticket as string,
        );
        console.log("Decoded Token:", token.oid); // Log the token to ensure correct decoding

        // Ensure organization ID exists
        if (!token.oid) {
          throw new Error("Organization ID not found in the token.");
        }

        // Get the organization
        const organization = await getOrganization(token.oid);
        if (!organization) {
          throw new Error("Organization not found");
        }

        // console.log("organization", organization.name);

        // // Fetch invitations
        // const invitations = await organization.getInvitations({
        //   status: ["pending"],
        // });

        // const invitation = invitations.data.find((inv) => inv.id === token.iid);
        // if (!invitation) {
        //   throw new Error("Invitation not found");
        // }

        // console.log("Invitation:", invitation);

        // Proceed with signup if invitation is found
        // const signup_auth = await signUp.create({
        //   emailAddress: invitation.emailAddress,
        //   ticket: clerk_ticket as string,
        //   strategy: "ticket",
        // });

        // console.log("Signup Status:", signup_auth.status);
        // if (signup_auth.status === "missing_requirements") {
        //   console.log("Missing requirements");
        // }
      } catch (error) {
        console.error("Error in handleSignUp:", error);
      }
      setIsLoading(false);
    }
  }, [
    clerk_status,
    isSignupLoaded,
    clerk_ticket,
    signUp,
    getOrganization,
    isClerkLoaded,
  ]);

  // Ensure the useEffect hook is always called
  useEffect(() => {
    console.log("Clerk Loaded:", isSignupLoaded, isClerkLoaded);
    if (clerk_status && clerk_ticket && isSignupLoaded && isClerkLoaded) {
      handleSignUp();
    }
  }, [clerk_status, clerk_ticket, isSignupLoaded, handleSignUp, isClerkLoaded]);

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={40} />
      </View>
    );

  return (
    <View className="flex-1 items-center justify-center">
      <Text>
        AcceptInvitation {clerk_ticket} {clerk_status}
      </Text>
    </View>
  );
}

// {"exp": 1731933339, "iid": "ins_2hXkQvuig7kKiPDE8FKcVQTMVSy", "oid": "org_2mKSHDPVBJ7Xi0jrRdMTHaXH4cS", "rurl": "fellow://accept-invitation", "sid": "orginv_2nelI82ZppML9GmmvgRp5SEIwq8", "st": "organization_invitation"}
