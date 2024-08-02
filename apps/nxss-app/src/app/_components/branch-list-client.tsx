"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { BoxIcon, PlusCircle } from "lucide-react";

import { RouterOutputs } from "@nxss/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerText,
} from "@nxss/ui/accordion";
import { NavItem } from "@nxss/ui/nav-item";

export default function BranchListClient({
  branchList,
}: {
  branchList: RouterOutputs["branch"]["getBranchList"];
}) {
  const pathname = usePathname();
  const params = useParams();
  return (
    <Accordion type="single" collapsible={false} className="w-full">
      {branchList.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id.toString()}
          open={pathname.startsWith(`/${params.org}/branch/${item.id}`)}
        >
          <Link href={`/${params.org}/branch/${item.id}`}>
            <AccordionTrigger
              isActive={pathname.startsWith(`/${params.org}/branch/${item.id}`)}
            >
              <BoxIcon className="size-4 flex-shrink-0" />
              <AccordionTriggerText>{item.name}</AccordionTriggerText>
            </AccordionTrigger>
          </Link>
          <AccordionContent>
            {[...Array(item.semesters)].map((_, index) => (
              <NavItem key={index}>Semester {index + 1}</NavItem>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
