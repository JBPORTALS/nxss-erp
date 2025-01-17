"use client";

import { useParams, usePathname } from "next/navigation";

type SwitcherType = "institution" | "branch";

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
    case "branch":
      return Boolean(params.branchId);
    case "institution":
      return !pathname.startsWith(`/${params.orgId}/branches`);
    default:
      return false;
  }
}
