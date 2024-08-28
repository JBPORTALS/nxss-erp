import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { RocketIcon } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (auth().sessionClaims?.metadata.onboardingComplete === true) {
    redirect("/");
  }

  return (
    <>
      <div className="relative flex h-screen w-full">
        <div className="h-full w-1/2 border-r">
          <img
            src="/Diamond-up-hat.png"
            className="absolute left-0 top-0 -z-10 dark:opacity-5"
          />
          <div className="flex h-full items-center justify-center">
            <div className="flex size-20 border-spacing-60 items-center justify-center rounded-full border-4 bg-primary outline-2 outline-offset-2 outline-primary-foreground">
              <RocketIcon className="size-10 text-primary-foreground" />
            </div>
          </div>
          <img
            src="/Diamond-down-hat.png"
            className="absolute bottom-0 right-1/2 -z-10 dark:opacity-5"
          />
        </div>
        {children}
      </div>
    </>
  );
}
