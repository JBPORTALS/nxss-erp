"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@nxss/ui/button";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <Button
        variant={"ghost"}
        className="w-full justify-start text-sm text-accent-foreground/60 hover:border-accent-foreground/50"
        onClick={handleBack}
      >
        <ArrowLeft className="size-5" />
        Back
      </Button>
    </div>
  );
}
