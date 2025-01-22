"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { LoaderCircleIcon } from "lucide-react";
import { z } from "zod";

import { insertStudentSchema, insertSubjectSchema } from "@nxss/db/schema";
import { Button } from "@nxss/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nxss/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@nxss/ui/form";
import { Label } from "@nxss/ui/label";
import { Textarea } from "@nxss/ui/textarea";
import { toast } from "@nxss/ui/toast";

import { api } from "~/trpc/react";

const addStudentsSchema = z.object({
  emails: z
    .string()
    .refine(
      (value) => {
        return value.split(",").length > 1 || !value.includes(" ");
      },
      {
        message: "Email addresses must be separated by commas.",
      },
    )
    .refine(
      (value) => {
        const emails = value.split(",").map((email) => email.trim());

        try {
          emails.forEach((email) => z.string().email().parse(email));
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "One or more emails are invalid or not properly formatted.",
      },
    ),
});
export function AddStudentsDialog({ children }: { children: React.ReactNode }) {
  const { semesterId, branchId, orgId } = useParams();
  const form = useForm({
    schema: addStudentsSchema,
    mode: "onChange",
  });
  const [open, onOpenChange] = useState(false);
  const utils = api.useUtils();
  const { mutateAsync: createStudent, isPending: isAddingStudents } =
    api.students.create.useMutation({
      onSuccess(data, variables, context) {
        utils.students.invalidate();
        onOpenChange(false); //close the dialog
        form.reset(); //reset the form
      },
    });

  async function onSubmit(values: z.infer<typeof addStudentsSchema>) {
    await Promise.all(
      values.emails.split(",").map((email) => {
        toast.promise(
          createStudent({
            email,
            currentSemesterId: semesterId,
            branchId,
            clerkInstitutionId: orgId,
          }),
          {
            loading: (
              <div className="flex items-center gap-2">
                <LoaderCircleIcon className="size-4 animate-spin" /> Adding...
              </div>
            ),
            success: (data) => {
              return `${data.email} added successfully`;
            },
            error: (data) =>
              data.shape.code === -32603
                ? ` ${email} already exists`
                : `Can't able to add ${email}`,
          },
        );
      }),
    );
  }

  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogTrigger asChild className="w-fit">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Students</DialogTitle>
          <DialogDescription>
            Add multiple emails seperated by comma
          </DialogDescription>
        </DialogHeader>

        {/* <pre>{JSON.stringify(form.formState.errors)}</pre> */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              disabled={form.formState.isSubmitting}
              name="emails"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      rows={5}
                      {...field}
                      placeholder="ravi@gmail.com, pushpa@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-5">
              <DialogClose asChild>
                <Button variant={"secondary"} className="w-full">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="w-full" isLoading={isAddingStudents}>
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
