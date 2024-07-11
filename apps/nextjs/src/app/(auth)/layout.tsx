import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default function Template(props: { children: React.ReactNode }) {
  if (auth().userId) redirect("/dashboard");
  return <>{props.children}</>;
}
