import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import {
  Briefcase,
  CalendarFold,
  GraduationCap,
  RocketIcon,
} from "lucide-react";

import { Badge } from "@nxss/ui/badge";
import { Button } from "@nxss/ui/button";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { HStack, VStack } from "@nxss/ui/stack";
import { Textarea } from "@nxss/ui/textarea";

export default function HomePage() {
  return (
    // <>
    //   <header className="flex h-16 items-center justify-between border-b bg-background px-8">
    //     <div className="flex items-center gap-2">
    //       <RocketIcon className="size-7" />
    //       <span className="font-mw text-xl">NexussERP</span>
    //     </div>
    //     <div className="flex items-center gap-4">
    //       {/* <Button variant={"outline"}>As a Staff</Button> */}
    //       <SignedIn>
    //         <Link href={"/sign-in"}>
    //           <Button variant={"outline"} size={"sm"}>
    //             Dashboard
    //           </Button>
    //         </Link>
    //       </SignedIn>
    //       <SignedOut>
    //         <Link href={"/sign-in"}>
    //           <Button size={"sm"}>Sign in</Button>
    //         </Link>
    //       </SignedOut>
    //     </div>
    //   </header>
    //   <main className="container h-screen py-16">
    //     <div className="flex flex-col items-center justify-center gap-1">
    //       <h1 className="font-mw w-3/4 text-center text-6xl font-extrabold leading-snug">
    //         Empowering Education with Smart ERP Solutions
    //       </h1>
    //       <p className="w-3/5 text-center text-xl text-foreground/50">
    //         Streamline academic management, enhance efficiency, and drive
    //         success with our comprehensive ERP system designed for educational
    //         institutions.
    //       </p>
    //       <Button size={"lg"} className="mt-8 h-14 rounded-full text-xl">
    //         Get a Demo
    //       </Button>
    //     </div>
    //   </main>
    // </>
    <div className="relative h-full w-screen">
      <header className="flex h-16 w-full items-center justify-between border-b px-16">
        <HStack className="items-center">
          <img src="/rocket.png" className="h-10 w-10" />
          <span className="font-mono text-3xl font-bold">NexussERP</span>
        </HStack>
        <HStack className="gap-6">
          <Button variant={"link"}>Docs</Button>
          <Button variant={"link"}>Products</Button>
          <Button variant={"link"}>Pricings</Button>
          <Button>Sign in</Button>
        </HStack>
      </header>
      <section className="relative px-[62px] pb-52">
        <img src="/Diamond-up-hat.png" className="absolute -z-10" />

        <VStack className="items-center gap-4 pb-80 pt-28">
          <Badge variant={"secondary"} className="mb-7 drop-shadow-sm">
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
          <Button className="mt-7 h-16 w-48 rounded-full text-xl">
            Get a Demo
          </Button>
          <img
            src="/Diamond-down-hat.png"
            className="absolute right-16 top-60 -z-10"
          />
        </VStack>

        <HStack className="w-full gap-6">
          <div className="w-full border-b pb-4"></div>
          <span className="min-w-fit text-3xl font-bold text-muted-foreground">
            Explore The Features
          </span>
          <div className="w-full border-b pb-4"></div>
        </HStack>
        <img src="/Diamond-up-hat.png" className="absolute -z-10" />
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
          className="absolute bottom-0 right-16 -z-10"
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
