"use client";

import React from "react";
import { useParams, usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@nxss/ui/breadcrumb";

export function BreadcrumbNavbar() {
  const pathname = usePathname();
  const { org } = useParams();
  const pathSegments = pathname.split("/").filter(Boolean);

  // Limit to the first two segments (org and one more)
  const limitedSegments =
    pathSegments.length > 2 ? pathSegments.slice(0, 2) : pathSegments;

  return (
    <div className="flex h-9 w-full items-center border border-border bg-accent/50 pl-4 backdrop-blur-md">
      <Breadcrumb>
        <BreadcrumbList>
          {limitedSegments.map((segment, index) => {
            const isFirstSegment = index === 0;
            const isLastSegment = index === limitedSegments.length - 1;

            // Define the href, handling the first segment to link to "/org/dashboard"
            const href = isFirstSegment
              ? `/${org}/dashboard`
              : `/${limitedSegments.slice(0, index + 1).join("/")}`;

            return (
              <React.Fragment key={href}>
                <BreadcrumbItem>
                  {isLastSegment ? (
                    <BreadcrumbPage>
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLastSegment && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
