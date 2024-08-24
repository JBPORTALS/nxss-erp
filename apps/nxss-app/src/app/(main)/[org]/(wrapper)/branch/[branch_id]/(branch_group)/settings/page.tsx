"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useFormStatus } from "react-dom";
import { z } from "zod";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@nxss/ui/breadcrumb";
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

import { deleteBranch, updateBranchDetails } from "~/trpc/actions";
import { api } from "~/trpc/react";

//just to track the state of the form
function DeleteBranchButton(props: React.ComponentProps<typeof Button>) {
  const state = useFormStatus();
  return (
    <Button
      disabled={state.pending}
      isLoading={state.pending}
      {...props}
      variant={"destructive_outline"}
      size={"lg"}
    >
      Delete Branch
    </Button>
  );
}

export default function page({
  params,
}: {
  children: React.ReactNode;
  params: {
    org: string;
    branch_id: string;
    sem_id: string;
  };
}) {
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

    if (response?.error)
      return toast.error("Something went wrong, Retry again!");

    toast.info("Branch updated successfully");
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <Breadcrumb>
          <BreadcrumbList className="text-accent-foreground/80">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${params.org}/branch/${params.branch_id}`}>
                  {data?.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ArrowRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem className="text-foreground">
              Settings
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex w-full flex-col justify-between gap-2">
          <h1 className="text-xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Facilities and Tools for Computer Science Engineering.
          </p>
        </div>
      </div>
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
          <VStack className="gap-2">
            <span className="text-lg font-semibold text-destructive">
              Delete Branch
            </span>
            <p className="w-2/3 text-sm text-muted-foreground">
              Deleting <b>Aerospace Engineering</b> branch will permanently
              erase all data included in this branch and this action is
              permanent and irreversible.
            </p>
          </VStack>
          <form
            action={async () => {
              await deleteBranch({ id: branch_id }).then((value) => {
                if (value.error)
                  return toast.error(value.error, { richColors: true });
              });
            }}
          >
            <DeleteBranchButton />
          </form>
        </VStack>
      </div>
    </div>
  );
}
