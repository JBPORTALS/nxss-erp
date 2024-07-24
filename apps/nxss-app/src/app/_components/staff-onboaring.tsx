"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";

import { Button, buttonVariants } from "@nxss/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@nxss/ui/form";
import { Input } from "@nxss/ui/input";
import { Separator } from "@nxss/ui/seperator";
import { toast } from "@nxss/ui/toast";
import { ProfileDetailsSchema } from "@nxss/validators";

import { completeOnboarding } from "~/trpc/actions";
import { UploadDropzone } from "~/utils/uploadthing";

export default function StaffOnboarding() {
  const form = useForm({
    schema: ProfileDetailsSchema,
  });

  const { user } = useUser();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values: z.infer<typeof ProfileDetailsSchema>) => {
    setLoading(true);
    const res = await completeOnboarding(values);
    if (res?.message) {
      // Reloads the user's data from Clerk's API
      await user?.reload();
      router.push("/");
    }
    if (res?.error) {
      setError(res?.error);
    }

    setLoading(false);
  };

  return (
    <section className="space-y-5 py-5">
      {error && <span className="text-destructive">{error}</span>}
      <div className="space-y-1">
        <h1 className="text-xl">Personal Details</h1>
        <p className="text-sm text-muted-foreground">
          Submit your profile Details to collaborate with the institution.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 space-y-6"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Adhitya" />
                </FormControl>
                <FormDescription>
                  As per your institution staff ID Card.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Chowdry" />
                </FormControl>
                <FormDescription>{"(Optional)"}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />
          <div className="space-y-1">
            <h1 className="text-xl">Indentification Document</h1>
            <p className="text-sm text-muted-foreground">
              Upload any identification document that can be recognized by your
              institution.
            </p>
            <FormField
              control={form.control}
              name="docUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UploadDropzone
                      appearance={{
                        button: buttonVariants({ variant: "primary" }),
                        container: "border-border border-2",
                        label: "text-foreground hover:text-foreground",
                      }}
                      config={{
                        appendOnPaste: true,
                      }}
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        console.log("Files: ", res);
                        form.setValue("docUrl", res.at(0)?.url ?? "");
                        toast.info("Document Uploaded");
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        toast.error(error.name, { description: error.message });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            isLoading={isLoading}
            size={"lg"}
            className="w-48"
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
}
