import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { RocketIcon } from "lucide-react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="flex justify-between px-8 py-4">
        <h1 className="text-xl font-medium">NexussERP</h1>
        <UserButton />
      </div>
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
