"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";

import { Avatar, AvatarFallback } from "@nxss/ui/avatar";
import { Button } from "@nxss/ui/button";
import { Checkbox } from "@nxss/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nxss/ui/dialog";
import { Input } from "@nxss/ui/input";
import { toast } from "@nxss/ui/toast";

import { api } from "~/trpc/react";

interface Student {
  id: string;
  full_name: string;
  student_id: string;
}

interface AddStudentsDialogProps {
  sectionName: string;
  batchName: string;
  children: React.ReactNode;
}

export function AddStudentsDialog({
  children,
  sectionName,
  batchName,
}: AddStudentsDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, onClose] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<Set<number>>(
    new Set(),
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const params = useParams() as Record<any, string>;

  const { data, isLoading } = api.students.searchStudents.useQuery(
    {
      searchTerm: debouncedSearchTerm,
      branchId: parseInt(params.branch_id!),
      semesterId: parseInt(params.semester_id!),
    },
    { enabled: true },
  );

  const students = data?.students;
  const router = useRouter();

  const addStudentsMutation = api.students.addStudentsToBatch.useMutation({
    onSuccess(data) {
      router.refresh();
      toast.success(data.message);
    },
  });

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(parseInt(studentId))) {
        newSet.delete(parseInt(studentId));
      } else {
        newSet.add(parseInt(studentId));
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (students && students.length > 0) {
      if (selectedStudents.size === students.length) {
        setSelectedStudents(new Set());
      } else {
        setSelectedStudents(new Set(students.map((s) => s.id)));
      }
    }
  };

  const handleAddStudents = async () => {
    try {
      await addStudentsMutation.mutateAsync({
        batchId: parseInt(params.batch_id!),
        studentIds: Array.from(selectedStudents),
      });
      onClose(false);
    } catch (error) {
      console.error("Failed to add students:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Students</DialogTitle>
          <DialogDescription>
            Select and add students to {sectionName} - {batchName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isLoading && <p>Loading...</p>}
          {!isLoading && students && students.length > 0 && (
            <div className="max-h-[300px] overflow-y-auto">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center space-x-2 py-2"
                >
                  <Checkbox
                    checked={selectedStudents.has(student.id)}
                    onCheckedChange={() =>
                      handleSelectStudent(student.id.toString())
                    }
                  />
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{student.full_name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{student.full_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {student.student_id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!isLoading && students && students.length === 0 && (
            <div className="py-4 text-center">
              <p className="text-muted-foreground">
                No matching students found
              </p>
              <p className="text-sm text-muted-foreground">
                We couldn't find any students matching {searchTerm}. Try
                checking the spelling or using a different search term.
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Checkbox
            checked={
              students &&
              students.length > 0 &&
              selectedStudents.size === students.length
            }
            onCheckedChange={handleSelectAll}
          >
            Select All
          </Checkbox>
          <Button
            onClick={handleAddStudents}
            size={"lg"}
            isLoading={addStudentsMutation.isPending}
            disabled={selectedStudents.size === 0 || students?.length === 0}
          >
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
