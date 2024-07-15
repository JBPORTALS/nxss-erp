import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { RocketIcon } from "lucide-react";

import { Button } from "@nxss/ui/button";

export default function HomePage() {
  return (
    <>
      <header className="flex h-16 items-center justify-between border-b bg-background px-8">
        <div className="flex items-center gap-2">
          <RocketIcon className="size-7" />
          <span className="font-mw text-xl">NexussERP</span>
        </div>
        <div className="flex items-center gap-4">
          {/* <Button variant={"outline"}>As a Staff</Button> */}
          <SignedIn>
            <Link href={"/sign-in"}>
              <Button variant={"outline"} size={"sm"}>
                Dashboard
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href={"/sign-in"}>
              <Button size={"sm"}>Sign in</Button>
            </Link>
          </SignedOut>
        </div>
      </header>
      <main className="container h-screen py-16">
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="font-mw w-3/4 text-center text-6xl font-extrabold leading-snug">
            Empowering Education with Smart ERP Solutions
          </h1>
          <p className="w-3/5 text-center text-xl text-foreground/50">
            Streamline academic management, enhance efficiency, and drive
            success with our comprehensive ERP system designed for educational
            institutions.
          </p>
          <Button size={"lg"} className="mt-8 h-14 rounded-full text-xl">
            Get a Demo
          </Button>
        </div>
      </main>
    </>
  );
}
