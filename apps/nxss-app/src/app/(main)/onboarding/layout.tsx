import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

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
            className="absolute left-0 top-0 -z-10"
          />
          <div className="flex h-full items-center justify-center">
            <img src="/rocket.png" className="h-20 w-20" />
          </div>
          <img
            src="/Diamond-down-hat.png"
            className="absolute bottom-0 right-1/2 -z-10"
          />
        </div>
        {children}
      </div>
    </>
  );
}
