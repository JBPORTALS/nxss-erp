"use client";

import Link from "next/link";
import { env } from "@/env";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  Briefcase,
  CalendarFold,
  GraduationCap,
  PlayCircleIcon,
  RocketIcon,
} from "lucide-react";

import { Avatar, AvatarImage } from "@nxss/ui/avatar";
import { Badge } from "@nxss/ui/badge";
import { Button } from "@nxss/ui/button";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { HStack, VStack } from "@nxss/ui/stack";
import { Textarea } from "@nxss/ui/textarea";

export default function HomePage() {
  const { user } = useUser();
  return (
    <div className="relative h-full w-full">
      <header className="flex h-16 w-full items-center justify-between border-b px-16">
        <HStack className="items-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary">
            <RocketIcon className="text-primary-foreground" />
          </div>
          <span className="font-mono text-2xl font-bold">NexussERP</span>
        </HStack>
        <HStack className="items-center gap-3">
          <Button variant={"link"}>Docs</Button>
          <Button variant={"link"}>Pricings</Button>
          <SignedIn>
            <Link href={env.NEXT_PUBLIC_NXSS_DASHBOARD_DOMAIN}>
              <Button variant={"ghost"}>
                Dashboard
                <Avatar className="size-6">
                  <AvatarImage src={user?.imageUrl} />
                </Avatar>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>
        </HStack>
      </header>
      <section className="relative px-[62px] pb-52">
        <img
          src="/Diamond-up-hat.png"
          className="absolute -z-10 opacity-65 dark:opacity-5"
        />

        <VStack className="items-center gap-4 pb-80 pt-28">
          <Badge
            variant={"secondary"}
            className="mb-7 text-sm font-normal drop-shadow-sm hover:bg-transparent"
          >
            Hey, Unlock the new features 🎉
          </Badge>
          <span className="w-[880px] text-center font-serif text-6xl font-extrabold">
            Empowering Education with Smart ERP Solutions
          </span>
          <span className="w-[1060px] text-center text-2xl">
            Streamline academic management, enhance efficiency, and drive
            success with our comrehensive ERP system designed for educational
            institutions.
          </span>
          <Button className="mt-7 h-14 w-48 rounded-full text-xl">
            Get a Demo <PlayCircleIcon />
          </Button>
          <img
            src="/Diamond-down-hat.png"
            className="absolute right-16 top-60 -z-10 opacity-65 dark:opacity-5"
          />
        </VStack>

        <HStack className="w-full gap-6">
          <div className="w-full border-b pb-4"></div>
          <span className="min-w-fit text-3xl font-bold text-muted-foreground">
            Explore The Features
          </span>
          <div className="w-full border-b pb-4"></div>
        </HStack>
        <img
          src="/Diamond-up-hat.png"
          className="absolute -z-10 opacity-65 dark:opacity-5"
        />
        <VStack className="my-24 gap-12 border-l pl-4">
          <HStack className="w-full gap-10">
            <HStack className="w-full">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-orange-600">
                <CalendarFold color="#f55c0a" size={40} />
              </div>
              <VStack className="gap-4">
                <span className="text-4xl font-bold">Session Management</span>
                <span className="h-full w-[628px] text-2xl leading-relaxed text-foreground/80">
                  Seamlessly track session schedules and attendance data in one
                  place. Our integrated solution provides a comprehensive view
                  of student participation and class timings, enhancing your
                  academic management.
                </span>
              </VStack>
            </HStack>
            <div className="h-[538px] w-full border"></div>
          </HStack>
          <HStack className="w-full gap-10">
            <HStack className="w-full">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-cyan-400">
                <GraduationCap color="#0FC1E9" size={40} />
              </div>
              <VStack className="gap-4">
                <span className="text-4xl font-bold">Student Management</span>
                <span className="h-full w-[628px] text-2xl leading-relaxed text-foreground/80">
                  Seamlessly track session schedules and attendance data in one
                  place. Our integrated solution provides a comprehensive view
                  of student participation and class timings, enhancing your
                  academic management.
                </span>
              </VStack>
            </HStack>
            <div className="h-[538px] w-full border"></div>
          </HStack>
          <HStack className="w-full gap-10">
            <HStack className="w-full">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-purple-600">
                <Briefcase color="#843DFF" size={40} />
              </div>
              <VStack className="gap-4">
                <span className="text-4xl font-bold">Staff Management</span>
                <span className="h-full w-[628px] text-2xl leading-relaxed text-foreground/80">
                  Seamlessly track session schedules and attendance data in one
                  place. Our integrated solution provides a comprehensive view
                  of student participation and class timings, enhancing your
                  academic management.
                </span>
              </VStack>
            </HStack>
            <div className="h-[538px] w-full border"></div>
          </HStack>
        </VStack>
        <HStack className="w-full gap-10">
          <div className="w-full border-b pb-4"></div>
          <VStack className="min-w-fit">
            <span className="w-full text-center text-3xl font-bold text-muted-foreground">
              Contact Us
            </span>
            <p className="text-lg text-muted-foreground">
              for further enquiries or to get a demo
            </p>
          </VStack>
          <div className="w-full border-b pb-4"></div>
        </HStack>
        <VStack className="w-full items-center pt-12">
          <form className="flex w-[500px] flex-col gap-6">
            <VStack>
              <Label className="text-lg">Full Name</Label>
              <Input type="name" required />
            </VStack>
            <VStack>
              <Label className="text-lg">Email</Label>
              <Input type="name" required />
            </VStack>
            <VStack>
              <Label className="text-lg">Phone Number</Label>
              <Input type="name" required />
            </VStack>
            <VStack>
              <Label className="text-lg">Message</Label>
              <Textarea
                rows={6}
                required
                className="w-full rounded-lg border"
              />
            </VStack>
            <Button className="h-12 text-xl">Submit</Button>
          </form>
        </VStack>
        <img
          src="/Diamond-down-hat.png"
          className="absolute bottom-0 right-16 -z-10 opacity-65 dark:opacity-5"
        />
      </section>
      <footer className="flex justify-between border-t px-20 py-8">
        <VStack>
          <span className="text-7xl font-bold text-muted-foreground">
            NexussERP
          </span>
          <span className="text-muted-foreground">
            @2024 NexussERP Platform | All Reserved
          </span>
        </VStack>
        <VStack>
          <div>
            <span className="text-2xl font-semibold">
              Get Nexuss Fellow App
            </span>
            <p className="text-muted-foreground">to get updates for students</p>
          </div>
          <img src="/playstore.png" />
          <img src="/appstore.png" />
        </VStack>
      </footer>
    </div>
  );
}
