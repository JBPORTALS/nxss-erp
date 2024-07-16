import React from "react";

import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { HStack, VStack } from "./stack";
import { Text } from "./text";

export default function Landingpage() {
  return (
    <div className="h-full w-[1728px] border">
      <header className="flex h-16 w-full items-center justify-between border-b px-16">
        <HStack className="items-center">
          <img
            src="A:\nxss-erp\apps\wizard\public"
            className="h-10 w-10 border"
          />
          <Text styles={"h3"} className="font-mono">
            NexussERP
          </Text>
        </HStack>
        <HStack className="gap-6">
          <Button variant={"link"}>Docs</Button>
          <Button variant={"link"}>Products</Button>
          <Button variant={"link"}>Pricings</Button>
          <Button>Sign in</Button>
        </HStack>
      </header>
      <section className="pb-52 px-[62px]">
        <VStack className="items-center gap-4 pb-80 pt-44">
          <span className="w-[1060px] text-center font-serif text-6xl font-extrabold">
            Empowering Education with Smart ERP Solutions
          </span>
          <span className="w-[1060px] text-center text-2xl">
            Streamline academic management, enhance efficiency, and drive
            success with our comprehensive ERP system designed for educational
            institutions.
          </span>
          <Button className="mt-7 h-16 w-48 rounded-full text-xl">
            Get a Demo
          </Button>
        </VStack>
        <HStack className="w-full gap-6">
          <div className="w-full border-b pb-4"></div>
          <span className="min-w-fit text-3xl font-bold text-muted-foreground">
            Explore The Features
          </span>
          <div className="w-full border-b pb-4"></div>
        </HStack>
        <VStack className="gap-12 py-24">
          <HStack className="w-full gap-10">
            <HStack className="w-full">
              <div className="h-[72px] w-[72px] border"></div>
              <VStack className="gap-4">
                <span className="text-4xl font-bold">Session Management</span>
                <span className="h-full w-[628px] text-2xl">
                  Seamlessly track session schedules and attendance data in one
                  place. Our integrated solution provides a comprehensive view
                  of student participation and class timings, enhancing your
                  academic management.
                </span>
              </VStack>
            </HStack>
            <div className="h-[538px] w-full border"></div>
          </HStack>
          <HStack className="w-full gap-10">
            <HStack className="w-full">
              <div className="h-[72px] w-[72px] border"></div>
              <VStack className="gap-4">
                <span className="text-4xl font-bold">Student Management</span>
                <span className="h-full w-[628px] text-2xl">
                  Seamlessly track session schedules and attendance data in one
                  place. Our integrated solution provides a comprehensive view
                  of student participation and class timings, enhancing your
                  academic management.
                </span>
              </VStack>
            </HStack>
            <div className="h-[538px] w-full border"></div>
          </HStack>
          <HStack className="w-full gap-10">
            <HStack className="w-full">
              <div className="h-[72px] w-[72px] border"></div>
              <VStack className="gap-4">
                <span className="text-4xl font-bold">Staff Management</span>
                <span className="h-full w-[628px] text-2xl">
                  Seamlessly track session schedules and attendance data in one
                  place. Our integrated solution provides a comprehensive view
                  of student participation and class timings, enhancing your
                  academic management.
                </span>
              </VStack>
            </HStack>
            <div className="h-[538px] w-full border"></div>
          </HStack>
        </VStack>
        <HStack className="w-full gap-10">
          <div className="w-full border-b pb-4"></div>
          <VStack className="min-w-fit">
            <span className="w-full text-center text-3xl font-bold text-muted-foreground">
              Contact Us
            </span>
            <p className="text-lg text-muted-foreground">
              for further enquiries or to get a demo
            </p>
          </VStack>
          <div className="w-full border-b pb-4"></div>
        </HStack>
        <VStack className="w-full items-center pt-12">
          <form className="flex w-[500px] flex-col gap-6">
            <VStack>
              <Label className="text-lg">Full Name</Label>
              <Input type="name" required />
            </VStack>
            <VStack>
              <Label className="text-lg">Email</Label>
              <Input type="name" required />
            </VStack>
            <VStack>
              <Label className="text-lg">Phone Number</Label>
              <Input type="name" required />
            </VStack>
            <VStack>
              <Label className="text-lg">Message</Label>
              <textarea
                rows={6}
                required
                className="w-full rounded-lg border"
              />
            </VStack>
            <Button className="h-12 text-xl">Submit</Button>
          </form>
        </VStack>
      </section>
    </div>
  );
}
