"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useClerk, useOrganizationList } from "@clerk/nextjs";
import { Calendar, CalendarRange } from "lucide-react";

import { Button } from "@nxss/ui/button";
import { Input } from "@nxss/ui/input";

const CreateOrganizationPage = () => {
  const [orgName, setOrgName] = useState("");
  const [examPattern, setExamPattern] = useState("");
  const router = useRouter();
  const { createOrganization } = useClerk();
  const { setActive, isLoaded } = useOrganizationList();

  const params = useParams<{ "create-organization": string[] }>();
  const pathname = params?.["create-organization"]?.join("/") || "";

  const handleCreateOrganization = async () => {
    try {
      const organization = await createOrganization({ name: orgName });

      if (isLoaded) {
        await setActive({ organization });
      }
      // Store exam pattern in your backend or Clerk metadata
      router.push("/create-organization/welcome");
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  };

  const renderStep = () => {
    switch (pathname) {
      case "":
        return (
          <div className="space-y-6">
            <h1 className="text-center text-2xl font-bold">
              Create Organization
            </h1>
            <Input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Acme Inc."
              className="h-10 w-full rounded border p-2"
            />
            <Button
              onClick={() => router.push("/create-organization/select-pattern")}
              className="w-full"
              size="lg"
            >
              Create
            </Button>
          </div>
        );
      case "select-pattern":
        if (!orgName) {
          router.push("/create-organization");
          return null;
        }
        return (
          <div className="space-y-5">
            <div>
              <h1 className="text-center text-2xl font-bold">Exam Pattern</h1>
              <p className="text-center text-sm text-muted-foreground">
                Select the exam pattern you follow in your organization. Please
                choose once you can't change it later.
              </p>
            </div>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setExamPattern("Annual")}
                className={`h-fit w-full justify-start gap-4 rounded-md border px-4 py-4 font-normal ${
                  examPattern === "Annual" ? "border-primary bg-accent" : ""
                }`}
              >
                <Calendar className="size-6 text-indigo-600" />
                <div className="flex flex-col items-start justify-start">
                  <h4 className="text-lg font-semibold">Annual</h4>
                  <span className="text-sm text-muted-foreground">
                    One exam per year
                  </span>
                </div>
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={() => setExamPattern("Semester")}
                className={`h-fit w-full justify-start gap-4 rounded-md border px-4 py-4 font-normal ${
                  examPattern === "Semester" ? "border-primary bg-accent" : ""
                }`}
              >
                <CalendarRange className="size-6 text-green-600" />
                <div className="flex flex-col items-start justify-start">
                  <h4 className="text-lg font-semibold">Semester</h4>
                  <span className="text-sm text-muted-foreground">
                    Two exams per year
                  </span>
                </div>
              </Button>
            </div>
            <Button
              onClick={handleCreateOrganization}
              className="w-full"
              size="lg"
            >
              Confirm
            </Button>
          </div>
        );
      case "welcome":
        if (!orgName || !examPattern) {
          router.push("/create-organization");
          return null;
        }
        return (
          <div className="w-full space-y-4 text-center">
            <h1 className="text-2xl font-bold">Welcome to NexussERP</h1>
            <p>Your organization is all set up and ready to go!</p>
            <div className="rounded bg-purple-100 p-4">
              <p className="font-semibold">{orgName}</p>
              <p>Academic Year 2024-25</p>
            </div>
            <Button
              onClick={() => router.push("/")}
              className="w-full"
              size="lg"
            >
              Continue
            </Button>
          </div>
        );
      default:
        router.push("/create-organization");
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full items-start justify-center">
      <div className="w-full max-w-sm">{renderStep()}</div>
    </div>
  );
};

export default CreateOrganizationPage;
