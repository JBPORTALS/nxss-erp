import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { RocketIcon } from "lucide-react";

export default function layout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();
  if (userId) redirect("/");
  return (
    <div className="flex min-h-screen">
      <div className="flex w-1/2 flex-col justify-between bg-black p-8 text-white">
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <RocketIcon /> Nexuss ERP
        </h1>
        <div className="mt-auto">
          <p className="italic">
            "This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before."
          </p>
          <p className="mt-2">Sofia Davis</p>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center">{children}</div>
    </div>
  );
}
