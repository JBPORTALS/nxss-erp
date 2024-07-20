"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  SignIn,
  SignUp,
  useClerk,
  useEmailLink,
  useSignIn,
  useSignUp,
} from "@clerk/nextjs";
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
  const ticket = useSearchParams().get("__clerk_ticket") as string | null;

  const { signUp, isLoaded } = useSignUp();
  const { organization } = useClerk();

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    setLoading(true);
    try {
      if (isLoaded && ticket)
        await signUp.create({
          password: values.password,
          strategy: "ticket",
          redirectUrl: "/onboarding",
          ticket,
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
      {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[400px] space-y-8 pt-14"
        >
          <div className="space-y-2">
            <RocketIcon className="mb-4 size-8" />
            <h1 className="text-xl font-semibold">Create Account</h1>
            <p className="text-base text-muted-foreground">
              Sign up to access the dashboard
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
            Create
          </Button>
        </form>
      </Form> */}
      <SignUp
        path="/invite/sign-up"
        routing="path"
        appearance={{
          elements: {},
        }}
      />
    </div>
  );
}
