"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { BoxIcon, PlusCircle } from "lucide-react";

import { RouterOutputs } from "@nxss/api";
import { NavItem } from "@nxss/ui/nav-item";
import {
  NavigationMenu,
  NavigationMenuButton,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuText,
} from "@nxss/ui/navigation-menu";

export default function BranchListClient({
  branchList,
}: {
  branchList: RouterOutputs["branch"]["getBranchList"];
}) {
  const pathname = usePathname();
  const params = useParams();
  return (
    <div className="w-full">
      {branchList.map((item) => (
        <NavigationMenu
          key={item.id}
          open={pathname.startsWith(`/${params.org}/branch/${item.id}`)}
        >
          <Link href={`/${params.org}/branch/${item.id}`}>
            {/* open is used to make the button active */}
            <NavigationMenuButton
              open={pathname.startsWith(`/${params.org}/branch/${item.id}`)}
            >
              <BoxIcon className="size-4 flex-shrink-0" />
              <NavigationMenuText>{item.name}</NavigationMenuText>
            </NavigationMenuButton>
          </Link>
          <NavigationMenuContent>
            {[...Array(item.semesters)].map((_, index) => (
              <Link href={`/${params.org}/branch/${item.id}/${index + 1}`}>
                <NavItem
                  key={index}
                  isActive={pathname.startsWith(
                    `/${params.org}/branch/${item.id}/${index + 1}`,
                  )}
                >
                  Semester {index + 1}
                </NavItem>
              </Link>
            ))}
          </NavigationMenuContent>
        </NavigationMenu>
      ))}
    </div>
  );
}
