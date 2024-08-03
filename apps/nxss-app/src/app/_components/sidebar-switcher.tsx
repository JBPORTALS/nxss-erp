"use client";

import { useParams } from "next/navigation";

export default function SidebarSwitcher({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "subject" | "main";
}) {
  const params = useParams();

  console.log(params);

  if (type == "subject" && params.subject_id) return <>{children}</>;
  if (type == "main" && !params.subject_id) return <>{children}</>;
  else return null;
}
