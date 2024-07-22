"use client";

import React from "react";

import { Button } from "@nxss/ui/button";
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
import { MultiStepForm, Step } from "@nxss/ui/multi-step-form";
import { ProfileDetailsSchema } from "@nxss/validators";

export default function StaffOnboarding() {
  const form = useForm({
    schema: ProfileDetailsSchema,
  });

  return (
    <section className="py-5">
      <MultiStepForm>
        <Step variant={"completed"}>
          <div>
            <h1 className="text-2xl">Personal Details</h1>
            <p className="text-muted-foreground">
              Submit your profile Details to collaborate with the institution
            </p>
          </div>
          <Form {...form}>
            <form className="w-1/2 space-y-6">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Adhitya Chowdry" />
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
                name="staffId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Staff ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="is0123" />
                    </FormControl>
                    <FormDescription>
                      Your institution staff ID.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button size={"lg"} className="w-48">
                Submit
              </Button>
            </form>
          </Form>
        </Step>
        <Step>
          <h1>Verify Your Identification</h1>
        </Step>
      </MultiStepForm>
    </section>
  );
}
