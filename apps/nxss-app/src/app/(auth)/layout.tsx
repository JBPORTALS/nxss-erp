import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default function layout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();
  if (userId) redirect("/");
  return <>{children}</>;
}
