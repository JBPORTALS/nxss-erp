import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import { Separator } from "@nxss/ui/seperator";

import { api } from "~/trpc/server";
import { DataTableClient } from "./data-table";

async function SectionsAndBatchesTable({
  params,
}: {
  params: { semester_id: string };
}) {
  const sectionsAndBatches = await api.sections.getSectionsAndBatches(
    parseInt(params.semester_id),
  );
  return (
    <ContentArea>
      <ContentAreaHeader>
        <ContentAreaTitle>Sections & Batches</ContentAreaTitle>
        <ContentAreaDescription>
          Student Allocation Across Sections and Batches
        </ContentAreaDescription>
      </ContentAreaHeader>
      <Separator />
      <ContentAreaContainer>
        <DataTableClient data={sectionsAndBatches} />
      </ContentAreaContainer>
    </ContentArea>
  );
}

export default SectionsAndBatchesTable;
