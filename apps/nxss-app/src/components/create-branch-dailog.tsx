"use client";

import React, { useState } from "react";
import { z } from "zod";

import { insertBranchSchema } from "@nxss/db/schema";
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
  });
  const [open, onOpenChange] = useState(false);
  const utils = api.useUtils();
  const { mutateAsync: createBranch } = api.branch.create.useMutation({
    onError(error) {
      return toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(`Branch ${data.name} created successfully`, {
        richColors: true,
      });
      utils.branch.invalidate();
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
          <DialogTitle>Create Branch</DialogTitle>
          <DialogDescription className="text-xs">
            A space for academic data course wise
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              disabled={form.formState.isSubmitting}
              name="name"
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
              name="semesters"
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
                    <SelectContent>
                      {Array.from({ length: 6 }).map(
                        (_, index) =>
                          (index + 1) % 2 === 0 && (
                            <SelectItem value={(index + 1).toString()}>
                              {index + 1}
                            </SelectItem>
                          ),
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
                    <SelectContent>
                      <SelectItem value={"odd"}>Odd Semesters</SelectItem>
                      <SelectItem value={"even"}>Even Semesters</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" isLoading={form.formState.isSubmitting}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
