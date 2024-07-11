import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  DotIcon,
  HomeIcon,
  PlusIcon,
  RocketIcon,
  SlashIcon,
  Users2Icon,
} from "lucide-react";

import { cn } from "@nxss/ui";
import { Button, buttonVariants } from "@nxss/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nxss/ui/select";
import { ThemeToggle } from "@nxss/ui/theme";

export default function Template(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="sticky inset-0 z-40 flex flex-col">
        <header className="relative flex items-center justify-between border-b bg-background/80 px-5 py-3.5 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Button
              size={"icon"}
              className="size-10 overflow-hidden rounded-full border border-border shadow-none"
            >
              <RocketIcon className="size-6" />
            </Button>
            <div className="flex items-center gap-1">
              <span className="font-semibold">KSIT</span>
              <DotIcon className="size-6 text-muted-foreground/80" />
              <Select value="2024">
                <SelectTrigger
                  className={cn(
                    "w-fit border-none px-2 text-base font-semibold shadow-none outline-none",
                  )}
                >
                  <SelectValue placeholder="Select Academic Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024-25</SelectItem>
                  <SelectItem value="2023">2023-24</SelectItem>
                  <SelectItem value="2022">2022-21</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* <Button variant={"outline"}>As a Staff</Button> */}
            <ThemeToggle />
            <UserButton />
          </div>
        </header>
      </div>
      <section className="flex flex-1">
        <aside className="sticky inset-0 w-[280px]  shrink-0 border-r py-5">
          <nav className="flex flex-col gap-3 pl-5">
            <span className="text-xs font-semibold text-muted-foreground">
              MAIN MENU
            </span>
            <Link href="/dashboard">
              <Button
                variant={"ghost"}
                className={cn(
                  "w-full justify-start rounded-e-none border-r-2 border-purple-600 bg-accent",
                )}
              >
                <HomeIcon className="size-4" /> Dashboard
              </Button>
            </Link>
            <Link href="#">
              <Button
                variant={"ghost"}
                className={cn(
                  "w-full justify-start rounded-e-none text-muted-foreground ",
                )}
              >
                <Users2Icon className="size-4" /> Faculty
              </Button>
            </Link>
            <div className="flex items-center justify-between pr-2">
              <span className="text-xs font-semibold text-muted-foreground">
                BRANCHES{" "}
              </span>
              <Button variant={"ghost"} size={"icon"}>
                <PlusIcon className="size-5" />
              </Button>
            </div>
            <main className="pr-2">
              <div className="space-y-2 rounded-lg border bg-secondary/10 p-5">
                <span className="font-semibold">No Branches</span>
                <p className="text-sm text-muted-foreground">
                  Create new branch by clicking on the Branches plus icon.
                </p>
              </div>
            </main>
          </nav>
        </aside>
        <main className="px-10 py-8">{props.children}</main>
      </section>
    </div>
  );
}
