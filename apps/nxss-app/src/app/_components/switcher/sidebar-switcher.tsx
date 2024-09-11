"use client";

import { useParams, usePathname } from "next/navigation";

type SwitcherType = "subject" | "main" | "setting" | "branch";

interface SidebarSwitcherProps {
  children: React.ReactNode;
  type: SwitcherType;
  path?: string;
}

export function SidebarSwitcher({
  children,
  type,
  path,
}: SidebarSwitcherProps) {
  const params = useParams();
  const pathname = usePathname();

  const shouldRender = useShouldRender(type, path, params, pathname);

  return shouldRender ? <>{children}</> : null;
}

function useShouldRender(
  type: SwitcherType,
  path: string | undefined,
  params: any,
  pathname: string,
): boolean {
  switch (type) {
    case "subject":
      return Boolean(params.subject_id);
    case "main":
      return (
        !params.subject_id &&
        !pathname.startsWith(`/${params.org}/settings`) &&
        !pathname.startsWith(`/${params.org}/branches/${params.branch_id}`)
      );
    case "setting":
      return path ? pathname.startsWith(path) : false;
    case "branch":
      return (
        !params.subject_id &&
        pathname.startsWith(`/${params.org}/branches/${params.branch_id}`)
      );
    default:
      return false;
  }
}
