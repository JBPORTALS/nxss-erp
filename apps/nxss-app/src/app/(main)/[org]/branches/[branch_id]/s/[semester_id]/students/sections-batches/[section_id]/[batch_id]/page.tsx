import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  SlashIcon,
  UserRoundPlusIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import { Separator } from "@nxss/ui/seperator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nxss/ui/table";

import { AddStudentsDialog } from "~/app/_components/dailog/add-student";
import { api } from "~/trpc/server";
import { DataTableClient } from "./data-table";

async function getData({ batchId }: { batchId: number }) {
  // Fetch data from your API here.
  return api.students.getByBatchId({ batchId });
}

const SectionBatchDetails = async ({
  params,
}: {
  params: { batch_id: string; section_id: string };
}) => {
  const data = await getData({
    batchId: parseInt(params.batch_id),
  });
  const batch = await api.batches.getDetails(params.batch_id);
  const section = await api.sections.getDetails(params.section_id);

  return (
    <ContentArea>
      <ContentAreaHeader className="flex-row justify-between">
        <div className="space-y-2">
          <ContentAreaTitle>
            {`Section ${section.name}`}
            {"  "}
            <SlashIcon className="size-5 -rotate-12 text-muted-foreground/40" />{" "}
            {batch.name}
          </ContentAreaTitle>
          <ContentAreaDescription>
            All students in this section & batch.
          </ContentAreaDescription>
        </div>
        <AddStudentsDialog
          batchName={batch.name}
          sectionName={`Section ${section.name}`}
        >
          <Button size={"lg"}>
            <UserRoundPlusIcon className="size-5" /> Add
          </Button>
        </AddStudentsDialog>
      </ContentAreaHeader>
      <Separator />
      <ContentAreaContainer>
        <DataTableClient data={data} />
      </ContentAreaContainer>
    </ContentArea>
  );
};

export default SectionBatchDetails;
