"use client";

import { useParams } from "next/navigation";
import { z } from "zod";

import { Button } from "@nxss/ui/button";
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
import { VStack } from "@nxss/ui/stack";
import { Textarea } from "@nxss/ui/textarea";
import { toast } from "@nxss/ui/toast";
import { UpdateBranchScheme } from "@nxss/validators";

import { updateBranchDetails } from "~/trpc/actions";
import { api } from "~/trpc/react";

export default function page() {
  const branch_id = useParams().branch_id as string;
  const { data } = api.branch.getDetails.useQuery({ id: branch_id });
  const form = useForm({
    schema: UpdateBranchScheme,
    defaultValues: {
      id: branch_id,
      name: data?.name,
      description: data?.description ?? "",
    },
    values: {
      id: branch_id,
      name: data?.name ?? "",
      description: data?.description ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateBranchScheme>) {
    const response = await updateBranchDetails(values);

    if (response.error)
      return toast.error("Something went wrong, Retry again!");
    toast.info(response.message);
  }

  return (
    <div>
      <VStack className="w-full gap-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              name="name"
              disabled={form.formState.isSubmitting}
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-2/5">
                  <Label>Name of the Branch</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              disabled={form.formState.isSubmitting}
              render={({ field }) => (
                <FormItem className="w-2/5">
                  <Label>Description of the Branch</Label>
                  <FormControl>
                    <Textarea rows={4} {...field} />
                  </FormControl>
                  <FormDescription>
                    This field can be left empty if you want.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-64">
              <Button
                type="submit"
                size={"lg"}
                isLoading={form.formState.isSubmitting}
                className="w-full"
              >
                Save Details
              </Button>
            </div>
          </form>
        </Form>
        <hr className="w-full"></hr>
        <VStack className="gap-1">
          <span className="text-xl font-semibold text-red-500">
            Delete Branch
          </span>
          <p>
            Deleting <b>Aerospace Engineering</b> branch will permanently erase
            all data included in this branch and this action is permanent and
            irreversible.
          </p>
        </VStack>
        <Button variant={"destructive_outline"} size={"lg"}>
          Delete Branch
        </Button>
      </VStack>
    </div>
  );
}
