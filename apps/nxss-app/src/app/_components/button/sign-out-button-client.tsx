"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

import { Button } from "@nxss/ui/button";
import { HStack } from "@nxss/ui/stack";

export default function SignOut() {
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  async function onSignout() {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  }

  return (
    <Button
      variant={"ghost"}
      size={"lg"}
      className="w-full justify-start rounded-none px-4"
      onClick={() => onSignout()}
      isLoading={isLoading}
      loadingText="Signing off ..."
    >
      <HStack>
        <LogOut className="size-5 text-muted-foreground" /> Sign-Out
      </HStack>
    </Button>
  );
}
