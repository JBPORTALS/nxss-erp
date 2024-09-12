"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

type BreadcrumbSetterProps = {
  name: string | (() => Promise<string>);
};

export function BreadcrumbSetter({ name }: BreadcrumbSetterProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const setBreadcrumb = async () => {
      let pathName: string;
      if (typeof name === "function") {
        pathName = await name();
      } else {
        pathName = name;
      }

      // Use router.push to update the URL with a query parameter
      router.push(`${pathname}?breadcrumb=${encodeURIComponent(pathName)}`);
    };

    setBreadcrumb();
  }, [name, pathname, router]);

  // This component doesn't render anything
  return null;
}
