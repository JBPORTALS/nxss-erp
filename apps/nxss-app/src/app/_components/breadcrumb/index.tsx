"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@nxss/ui/breadcrumb";

interface BreadcrumbItem {
  href: string;
  label: string;
}

export function BreadcrumbNavbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    const generateBreadcrumbs = () => {
      const pathSegments = pathname.split("/").filter(Boolean);
      const breadcrumbItems: BreadcrumbItem[] = [];

      let currentPath = "";
      for (let i = 0; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        currentPath += `/${segment}`;

        if (i === pathSegments.length - 1) {
          // Use the provided label from the query parameter, or fall back to the segment
          const customLabel = searchParams.get("breadcrumb");
          breadcrumbItems.push({
            href: currentPath,
            label: customLabel ?? segment ?? "",
          });
        } else {
          breadcrumbItems.push({ href: currentPath, label: segment ?? "" });
        }
      }

      setBreadcrumbs(breadcrumbItems);
    };

    generateBreadcrumbs();
  }, [pathname, searchParams]);

  return (
    <div className="flex h-9 w-full items-center border border-border bg-accent/50 pl-4 backdrop-blur-md">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => {
            const isLastItem = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={breadcrumb.href}>
                <BreadcrumbItem>
                  {isLastItem ? (
                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLastItem && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
