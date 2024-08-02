import Link from "next/link";
import { Protect } from "@clerk/nextjs";
import {
  HomeIcon,
  Layers,
  PlusCircle,
  PlusIcon,
  Users2Icon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerText,
} from "@nxss/ui/accordion";
import { Sidebar, SidebarBody, SidebarLabel } from "@nxss/ui/asidebar";
import { Button } from "@nxss/ui/button";
import { NavItem } from "@nxss/ui/nav-item";

import Dailog from "./dailog/sidebar-dailog";
import { SidebarItemClient } from "./sidebar-item";

export default function AsideBarClient({
  params,
}: {
  params: { org: string };
}) {
  const accordionItems = [
    {
      id: "item-1",
      title: "Artificial Intelligence",
      semesters: 6,
    },
  ];
  const hasAccordion = accordionItems.length > 0;
  return (
    <Sidebar>
      <SidebarLabel>MAIN MENU</SidebarLabel>
      <SidebarBody>
        <SidebarItemClient path={`/${params.org}/dashboard`}>
          <HomeIcon className="size-4" /> Dashboard
        </SidebarItemClient>

        <Protect role="org:admin">
          <SidebarItemClient path={`/${params.org}/faculty`}>
            <Users2Icon className="size-4" /> Faculty
          </SidebarItemClient>
          <SidebarItemClient path={`/${params.org}/subjects`}>
            <Layers className="size-4" /> Subjects
          </SidebarItemClient>
        </Protect>
      </SidebarBody>
      <Protect role="org:admin">
        <SidebarLabel className="flex items-center justify-between pr-2">
          BRANCHES
          <Dailog />
        </SidebarLabel>
      </Protect>
      <Protect role="org:staff">
        <SidebarLabel className="flex items-center justify-between pr-2">
          SUBJECTS
        </SidebarLabel>
      </Protect>
      <SidebarBody>
        {hasAccordion ? (
          <Accordion type="single" collapsible={false} className="w-full">
            {accordionItems.map((item) => (
              <AccordionItem key={item.id} value={item.id} open={true}>
                <Link href={`/${params.org}/branch/${item.id}`}>
                  <AccordionTrigger>
                    <PlusCircle className="size-4 flex-shrink-0" />
                    <AccordionTriggerText>{item.title}</AccordionTriggerText>
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
        ) : (
          <main className="pr-2">
            <div className="space-y-2 rounded-lg border bg-secondary/10 p-5">
              <Protect role="org:admin">
                <span className="text-sm font-semibold">No Branches</span>
                <p className="text-xs text-muted-foreground">
                  Create new branch by clicking on the BRANCHES plus icon.
                </p>
              </Protect>
              <Protect role="org:staff">
                <span className="text-sm font-semibold">
                  No Subjects Assigned
                </span>
                <p className="text-xs text-muted-foreground">
                  Wait for subject allocation by your institution admin.
                </p>
              </Protect>
            </div>
          </main>
        )}
      </SidebarBody>
    </Sidebar>
  );
}
