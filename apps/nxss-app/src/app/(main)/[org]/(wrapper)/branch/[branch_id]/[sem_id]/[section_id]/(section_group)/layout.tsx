import { ArrowRight, Link } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@nxss/ui/breadcrumb";
import { VStack } from "@nxss/ui/stack";

import SectionTabsClient from "~/app/_components/tabs/section-tabs";

export default async function Template({ children }: any) {
  return (
    <div className="flex flex-col gap-8">
      <VStack>
        <Breadcrumb>
          <BreadcrumbList className="text-accent-foreground/80">
            <BreadcrumbItem className="text-foreground">
              Section A
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold">Section A</h1>
        <p className="text-sm text-muted-foreground">
          Class Details and Enrollment Information
        </p>
      </VStack>
      <SectionTabsClient />
      <section className="w-full">{children}</section>
    </div>
  );
}
