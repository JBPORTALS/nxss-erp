"use client";

import { useParams, usePathname } from "next/navigation";

export default function SidebarSwitcher({
  children,
  type,
  path,
}: {
  children: React.ReactNode;
  type: "subject" | "main" | "setting";
  path?: string;
}) {
  const params = useParams();
  const pathname = usePathname();

  console.log(params);

  if (type == "subject" && params.subject_id) return <>{children}</>;
  else if (
    type == "main" &&
    !params.subject_id &&
    !pathname.startsWith(`/${params.org}/settings`)
  )
    return <>{children}</>;
  else if (type == "setting" && path && pathname.startsWith(path))
    return <>{children}</>;
  else return null;
}
