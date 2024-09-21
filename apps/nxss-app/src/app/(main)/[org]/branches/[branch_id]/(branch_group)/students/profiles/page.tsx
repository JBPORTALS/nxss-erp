import { Button } from "@nxss/ui/button";
import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";
import { Separator } from "@nxss/ui/seperator";

import { DataTable } from "~/app/_components/data-table";
import { columns, Payment } from "./columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const SectionsAndBatchesTable = async () => {
  const data = await getData();
  // Function to generate a consistent color based on the name
  // const getAvatarColor = (name: string) => {
  //   let hash = 0;
  //   for (let i = 0; i < name.length; i++) {
  //     hash = name.charCodeAt(i) + ((hash << 5) - hash);
  //   }
  //   const hue = hash % 360;
  //   return `hsl(${hue}, 70%, 80%)`;
  // };

  return (
    <ContentArea>
      <ContentAreaHeader className="flex flex-row justify-between">
        <div className="space-y-2">
          <ContentAreaTitle>Profiles</ContentAreaTitle>
          <ContentAreaDescription>
            All Students in computer Science
          </ContentAreaDescription>
        </div>
        <Button>Import</Button>
      </ContentAreaHeader>
      <Separator />
      <ContentAreaContainer>
        <DataTable columns={columns} data={data} />
      </ContentAreaContainer>
    </ContentArea>
  );
};

export default SectionsAndBatchesTable;
