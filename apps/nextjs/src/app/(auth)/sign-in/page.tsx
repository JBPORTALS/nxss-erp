"use client";

import { useSignIn } from "@clerk/nextjs";
import { RocketIcon } from "lucide-react";
import { z } from "zod";

import { Button } from "@nxss/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@nxss/ui/form";
import { Input } from "@nxss/ui/input";
import { SignInSchema } from "@nxss/validators";

export default function Page() {
  const form = useForm({
    schema: SignInSchema,
  });

  const { signIn, isLoaded } = useSignIn();

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    try {
      if (isLoaded)
        await signIn.create({
          password: values.password,
          identifier: values.email,
          strategy: "password",
        });
      window.location.reload();
    } catch (err: any) {
      console.log("signin failed:", err);
      form.setValue("error", "Credentials are invalid. Please try again.");
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[400px] space-y-8 pt-14"
        >
          <div className="space-y-2">
            <RocketIcon className="mb-4 size-8" />
            <h1 className="text-xl font-semibold">Welcome back</h1>
            <p className="text-base text-muted-foreground">
              Sign in to access the dashboard
            </p>
          </div>
          <p className="text-base text-destructive">{form.getValues().error}</p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="h-10"
                    placeholder="joe@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className="h-10" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            isLoading={form.formState.isSubmitting}
            size={"lg"}
            className="w-full"
            type="submit"
          >
            Signin
          </Button>
        </form>
      </Form>
    </div>
  );
}
