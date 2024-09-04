import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@nxss/ui/breadcrumb";
import { Button } from "@nxss/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nxss/ui/dialog";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { HStack, VStack } from "@nxss/ui/stack";

import SectionTabsClient from "~/app/_components/tabs/section-tabs";
import { api } from "~/trpc/server";

export default async function Template({
  params,
  children,
}: {
  children: React.ReactNode;
  params: {
    org: string;
    branch_id: string;
    sem_id: string;
  };
}) {
  const branch_details = await api.branch.getDetails({ id: params.branch_id });
  return (
    <div className="flex flex-col gap-8">
      <HStack className="justify-between">
        <VStack>
          <Breadcrumb>
            <BreadcrumbList className="text-accent-foreground/80">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${params.org}/branch/${params.branch_id}`}>
                    {branch_details?.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ArrowRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${params.org}/branch/${params.branch_id}/1`}>
                    Semester 1
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ArrowRight />
              </BreadcrumbSeparator>
              <BreadcrumbList className="text-accent-foreground/80">
                <BreadcrumbItem className="text-foreground">
                  Section A
                </BreadcrumbItem>
              </BreadcrumbList>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold">Section A</h1>
          <p className="text-sm text-muted-foreground">
            Facilities and Tools for Sections
          </p>
        </VStack>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Batches </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Batches</DialogTitle>
              <DialogDescription>
                Batch Organization and Scheduling
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <VStack className="gap-2">
                <Label>Batch Name</Label>
                <Input placeholder="Enter..." />
              </VStack>
              <VStack className="gap-2">
                <Label>Description</Label>
                <Input placeholder="Type here..." />
                <span>( Optional )</span>
              </VStack>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </HStack>
      <SectionTabsClient />
      <section className="w-full">{children}</section>
    </div>
  );
}
