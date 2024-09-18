import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default function Template({ children }: { children: React.ReactNode }) {
  const { orgRole } = auth();

  if (orgRole !== "org:admin") return notFound();

  return <>{children}</>;
}
