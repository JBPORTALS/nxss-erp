"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { z } from "zod";

import { insertSubjectSchema } from "@nxss/db/schema";
import { Button } from "@nxss/ui/button";
import {
  Dialog,
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
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@nxss/ui/form";
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import { toast } from "@nxss/ui/toast";

import { api } from "~/trpc/react";

const createSubjectSchema = insertSubjectSchema.omit({
  semesterId: true,
  branchId: true,
});
export default function CreateSubjectDailog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { semesterId, branchId } = useParams();
  const form = useForm({
    schema: createSubjectSchema,
    mode: "onChange",
  });
  const [open, onOpenChange] = useState(false);
  const utils = api.useUtils();
  const { mutateAsync: createSubject, isPending: isCreatingBranch } =
    api.subjects.create.useMutation({
      onError(error) {
        return toast.error(error.message);
      },
      onSuccess(data) {
        toast.success(`Branch ${data.title} created successfully`, {
          richColors: true,
        });
        utils.subjects.invalidate();
        onOpenChange(false); //close the dialog
        form.reset(); //reset the form
      },
    });

  async function onSubmit(values: z.infer<typeof createSubjectSchema>) {
    await createSubject({ ...values, semesterId, branchId });
  }

  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogTrigger asChild className="w-fit">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Subject</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              disabled={form.formState.isSubmitting}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>Name of the subject</Label>
                  <FormControl>
                    <Input {...field} placeholder="ex. Science" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-5">
              <Button className="w-full" isLoading={isCreatingBranch}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
