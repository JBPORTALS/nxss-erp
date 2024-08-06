import Link from "next/link";
import { Meta, StoryObj } from "@storybook/react";
import { ArrowRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@nxss/ui/breadcrumb";
import { Button } from "@nxss/ui/button";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { HStack, VStack } from "@nxss/ui/stack";
import { Textarea } from "@nxss/ui/textarea";

const meta: Meta = {
  title: "Subject/Settings",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Multiple: Story = {
  args: {},
  render: () => {
    return (
      <div className="">
        <div className="flex flex-col gap-2">
          <Breadcrumb>
            <BreadcrumbList className="text-accent-foreground/80">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`#`}>Computer Science</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ArrowRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem className="text-foreground">
                Semester 1
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <span className="text-muted-foreground">
            An journey throughout space with engineering
          </span>
          </div>
        <hr className="my-5 w-full"></hr>

        <VStack className="gap-9">
          <VStack>
            <Label>Subject</Label>
            <HStack className="items-center">
              <div className={`size-6 rounded-full bg-blue-400`}></div>
              <Input
                defaultValue={"Fundamentals of computer"}
                className="w-96"
              />
            </HStack>
          </VStack>
          <VStack>
            {" "}
            <Label>Description</Label>
            <Textarea
              className="h-24 w-96"
              defaultValue={
                "Fundamentals of computers cover the core principles and essential components of digital technology and computing systems."
              }
            />
          </VStack>
          <Button size={"lg"}>Save details</Button>
        </VStack>
        <hr className="my-5 w-full"></hr>
        <VStack className="gap-8">
          <VStack>
            <span className="text-lg font-semibold text-red-500">
              Clear data of semester
            </span>
            <p className="w-2/3 text-muted-foreground">
              Clearing all data of{" "}
              <span className="text-foreground">Fundamentals of computers</span>{" "}
              will permanently erase all data and this action is{" "}
              <span className="text-red-500">permanent and irreversible.</span>
            </p>
          </VStack>
          <Button size={"lg"} variant={"destructive_outline"}>
            Clear Data
          </Button>
        </VStack>
      </div>
    );
  },
};
