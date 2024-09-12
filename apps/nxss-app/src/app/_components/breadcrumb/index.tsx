"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@nxss/ui/breadcrumb";

import { usePathMap } from "~/utils/breadcrumb";

interface BreadcrumbItem {
  href: string;
  label: string;
}

export function BreadcrumbNavbar() {
  const items = usePathMap();

  return (
    <div className="flex h-9 w-full items-center border border-border bg-accent/50 pl-4 backdrop-blur-md">
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
              )}
              <BreadcrumbItem>
                {index === items.length - 1 ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
