import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@nxss/ui/card";
import {
  ContentArea,
  ContentAreaContainer,
  ContentAreaDescription,
  ContentAreaHeader,
  ContentAreaTitle,
} from "@nxss/ui/content-area";

import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  params: { branch_id: string };
}) {
  const branch = await api.branch.getDetails({ id: params.branch_id });

  return (
    <ContentArea>
      <ContentAreaHeader>
        <ContentAreaTitle>{branch?.name}</ContentAreaTitle>
        <ContentAreaDescription>{branch?.description}</ContentAreaDescription>
      </ContentAreaHeader>

      <ContentAreaContainer className="grid h-fit w-full gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader>
            <CardTitle className="text-base font-normal">
              Total Staff’s
            </CardTitle>
            <CardDescription>Active Staff Members</CardDescription>
          </CardHeader>
          <CardContent className="text-xl font-semibold">50</CardContent>
        </Card>

        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader>
            <CardTitle className="text-base font-normal">
              Total Student’s
            </CardTitle>
            <CardDescription>Total Active Students</CardDescription>
          </CardHeader>
          <CardContent className="text-xl font-semibold">15000</CardContent>
        </Card>

        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader>
            <CardTitle className="text-base font-normal">
              Total Branches
            </CardTitle>
            <CardDescription>Branches in Operation</CardDescription>
          </CardHeader>
          <CardContent className="text-xl font-semibold">06</CardContent>
        </Card>

        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader>
            <CardTitle className="text-base font-normal">
              Total Subjects
            </CardTitle>
            <CardDescription>Subjects in Current Catalog</CardDescription>
          </CardHeader>
          <CardContent className="text-xl font-semibold">50</CardContent>
        </Card>
      </ContentAreaContainer>
    </ContentArea>
  );
}