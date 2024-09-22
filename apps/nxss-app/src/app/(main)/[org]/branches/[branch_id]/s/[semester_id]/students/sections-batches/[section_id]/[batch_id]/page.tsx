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

  // Function to generate a consistent color based on the name
  const getAvatarColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  return (
    <ContentArea>
      <ContentAreaHeader className="flex-row justify-between">
        <div className="space-y-2">
          <ContentAreaTitle>
            {decodeURI(params.section_id as string)}
            {"  "}
            <SlashIcon className="size-5 -rotate-12 text-muted-foreground/40" />{" "}
            Batch {params.batch_id}
          </ContentAreaTitle>
          <ContentAreaDescription>
            All students in this section & batch.
          </ContentAreaDescription>
        </div>
        <Button size={"lg"}>
          <UserRoundPlusIcon className="size-5" /> Add
        </Button>
      </ContentAreaHeader>
      <Separator />
      <ContentAreaContainer>
        <DataTableClient data={data} />
      </ContentAreaContainer>
    </ContentArea>
  );
};

export default SectionBatchDetails;
