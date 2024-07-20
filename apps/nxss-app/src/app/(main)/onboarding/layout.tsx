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

  return <>{children}</>;
}
