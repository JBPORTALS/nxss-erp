"use client";

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
import { CreateOrganizationScheme } from "@nxss/validators";

export default function NameStep({
  onNext,
  initialData,
}: {
  onNext: (data: any) => void;
  initialData: any;
}) {
  const form = useForm({
    schema: CreateOrganizationScheme,
    defaultValues: initialData,
  });

  const onSubmit = (values: z.infer<typeof CreateOrganizationScheme>) => {
    onNext({ name: values.name });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <h1 className="text-center text-2xl font-bold">Create Organization</h1>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormDescription>
                All settings will be consider for this organization only
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          isLoading={form.formState.isLoading}
          type="submit"
          size={"lg"}
          className="w-full"
        >
          Create
        </Button>
      </form>
    </Form>
  );
}
