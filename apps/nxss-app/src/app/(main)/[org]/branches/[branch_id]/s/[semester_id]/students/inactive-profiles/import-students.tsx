"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@nxss/ui/button";
import { toast } from "@nxss/ui/toast";

import { api } from "~/trpc/react";
import sampleStudentData from "./sample-data";

interface ImportExcelProps {
  branchId: number;
  semesterId: number;
}

export const ImportExcelComponent: React.FC<ImportExcelProps> = ({
  branchId,
  semesterId,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const importMutation = api.students.importStudents.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.success("Import successful", {
        description: "Student data has been imported successfully.",
      });
    },
    onError: (error) => {
      toast.error("Import Failed", {
        description: error.message,
      });
    },
  });

  const handleImport = async () => {
    importMutation.mutate({
      branchId,
      semesterId,
      students: sampleStudentData,
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <Button onClick={handleImport} disabled={importMutation.isPending}>
        {importMutation.isPending ? "Importing..." : "Import"}
      </Button>
    </div>
  );
};
