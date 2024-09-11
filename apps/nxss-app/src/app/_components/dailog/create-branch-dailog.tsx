"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { z } from "zod";

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
import { Textarea } from "@nxss/ui/textarea";
import { toast } from "@nxss/ui/toast";
import { CreateBranchScheme } from "@nxss/validators";

import { createBranch } from "~/trpc/actions";

export default function CreateBranchDailog({
  children,
}: {
  children: React.ReactNode;
}) {
  const form = useForm({
    schema: CreateBranchScheme,
    mode: "onChange",
  });
  const [open, onOpenChange] = useState(false);

  async function onSubmit(values: z.infer<typeof CreateBranchScheme>) {
    const response = await createBranch(values);

    if (response?.error)
      return toast.error(response.error, { richColors: true });

    toast.success(`Branch ${values.name} created successfully`, {
      richColors: true,
    });

    onOpenChange(false); //close the dialog
    form.reset(); //reset the form
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
              name="description"
              disabled={form.formState.isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <Label>Description</Label>
                  <FormControl>
                    <Textarea {...field} placeholder="No description..." />
                  </FormControl>
                  <FormDescription>This is field is optional</FormDescription>
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
