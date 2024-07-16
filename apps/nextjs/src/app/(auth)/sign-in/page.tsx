"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SignIn, useSignIn } from "@clerk/nextjs";
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
  const [isLoading, setLoading] = useState(false);
  const redirect_url = useSearchParams().get("redirect_url");

  const { signIn, isLoaded } = useSignIn();

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    setLoading(true);
    try {
      if (isLoaded)
        await signIn.create({
          password: values.password,
          identifier: values.email,
          strategy: "password",
        });
      if (redirect_url) {
        window.location.href = redirect_url;
      } else {
        window.location.reload();
      }
    } catch (err: any) {
      console.log("signin failed:", err);
      form.setValue("error", "Invalid Credentials. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center pt-20">
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            isLoading={isLoading}
            size={"lg"}
            className="w-full"
            type="submit"
          >
            Signin
          </Button>
        </form>
      </Form>
      {/* <SignIn
        routing="virtual"
        appearance={{
          elements: {},
        }}
      /> */}
    </div>
  );
}
