"use client";

import Link from "next/link";
import { Box } from "lucide-react";

import { NavigationMenuText } from "@nxss/ui/navigation-menu";

import {
  NavigationMenuButtonClient,
  NavigationMenuClient,
  NavigationMenuContentClient,
} from "./navigation-menu-client";
import BatchItemServer from "./sidebar/batch-item-server";
import {
  TestMenuButtonClient,
  TestMenuClient,
  TestMenuContentClient,
  TestMenuItemClient,
} from "./test-menu-client";

export default function TestTypeClient({
  params,
}: {
  params: { org: string };
}) {
  // Example data structure for test types
  const TestTypes = [
    {
      id: 1,
      name: "Written Test",
    },
    {
      id: 2,
      name: "Skill Test",
    },
  ];

  // Correcting the console.log to avoid errors
  console.log(TestTypes.map((type) => type.id));

  return (
    <TestMenuClient>
      <Link href={`/${params.org}/branch/1/1/subject/1/test`}>
        <TestMenuButtonClient>
          <Box className="size-4" />
          <NavigationMenuText>Marks</NavigationMenuText>
        </TestMenuButtonClient>
      </Link>
      {/* Looping through NavigationMenuContentClient */}
      <TestMenuContentClient>
        {TestTypes.map((type) => (
          <Link href={`/rjs/branch/1/1/subject/1/test/${type.id} `}>
            <TestMenuItemClient id={`${type.id}`}>
              {type.name}
            </TestMenuItemClient>
          </Link>
        ))}
      </TestMenuContentClient>
    </TestMenuClient>
  );
}
