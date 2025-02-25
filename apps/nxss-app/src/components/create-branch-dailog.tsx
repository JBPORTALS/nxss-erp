"use client";

import React, { useState } from "react";
import { z } from "zod";

import { insertBranchSchema } from "@nxss/db/schema";
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
import { Input } from "@nxss/ui/input";
import { Label } from "@nxss/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nxss/ui/select";
import { toast } from "@nxss/ui/toast";

import { api } from "~/trpc/react";

export default function CreateBranchDailog({
  children,
}: {
  children: React.ReactNode;
}) {
  const form = useForm({
    schema: insertBranchSchema,
    mode: "onChange",
    defaultValues: {
      noOfSemesters: 6,
      semesterStartsWith: "odd",
    },
  });
  const [open, onOpenChange] = useState(false);
  const utils = api.useUtils();
  const { mutateAsync: createBranch, isPending: isCreatingBranch } =
    api.branches.create.useMutation({
      onError(error) {
        return toast.error(error.message);
      },
      onSuccess(data) {
        toast.success(`Branch ${data.title} created successfully`, {
          richColors: true,
        });
        utils.branches.invalidate();
        utils.semester.invalidate();
        onOpenChange(false); //close the dialog
        form.reset(); //reset the form
      },
    });

  async function onSubmit(values: z.infer<typeof insertBranchSchema>) {
    await createBranch(values);
  }

  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogTrigger asChild className="w-fit">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Branch</DialogTitle>
          <DialogDescription className="text-xs">
            A space for academic data course wise
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              disabled={form.formState.isSubmitting}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>Name of the branch</Label>
                  <FormControl>
                    <Input {...field} placeholder="Acme" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={form.formState.isSubmitting}
              name="noOfSemesters"
              render={({ field }) => (
                <FormItem>
                  <Label>No. Semesters</Label>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent side="top" sideOffset={-75}>
                      {Array.from({ length: 6 })
                        .fill(0)
                        .map((_, index) =>
                          (index + 1) % 2 === 0 ? (
                            <SelectItem value={(index + 1).toString()}>
                              {index + 1}
                            </SelectItem>
                          ) : null,
                        )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              disabled={form.formState.isSubmitting}
              name="semesterStartsWith"
              render={({ field }) => (
                <FormItem>
                  <Label>Start with</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent side="top" sideOffset={-75}>
                      <SelectItem value={"odd"}>Odd Semesters</SelectItem>
                      <SelectItem value={"even"}>Even Semesters</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-5">
              <DialogClose asChild>
                <Button variant={"outline"} className="w-full">
                  Cancel
                </Button>
              </DialogClose>
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
