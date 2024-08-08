import React from "react";
import Link from "next/link";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { LogOut, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@nxss/ui/popover";
import { HStack, VStack } from "@nxss/ui/stack";
import { ThemeToggle } from "@nxss/ui/theme";

import SignOut from "../sign-out-button-client";

export default async function ProfilePopover({
  params,
}: {
  params: {
    org: string;
  };
}) {
  const { userId } = auth();
  const userDetials = await clerkClient().users.getUser(userId ?? "");
  const { emailAddresses, fullName, imageUrl } = userDetials;

  return (
    <div>
      <Popover>
        <PopoverTrigger className="w-full items-end">
          <Avatar className="size-8 border">
            <AvatarImage src={imageUrl} alt={fullName ?? "Anonymous"} />
            <AvatarFallback>{fullName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-72 px-0 py-4">
          <div className="space-y-2">
            <HStack className="gap-2 px-4">
              <Avatar className="border">
                <AvatarImage src={imageUrl} alt={fullName ?? "Anonymous"} />
                <AvatarFallback>{fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <VStack className="gap-1">
                <h4 className="font-medium leading-none">{fullName}</h4>
                <p className="text-sm text-muted-foreground">
                  {emailAddresses.at(0)?.emailAddress}
                </p>
              </VStack>
            </HStack>
            <hr></hr>
            <VStack className="w-full">
              <Button
                variant={"ghost"}
                size={"lg"}
                className="w-full justify-start rounded-none px-4"
              >
                <Link href={`/${params.org}/settings`} className="w-full">
                  <HStack>
                    <Settings className="size-5 text-muted-foreground" />{" "}
                    Settings
                  </HStack>
                </Link>
              </Button>
              <SignOut />
              <ThemeToggle />
            </VStack>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
