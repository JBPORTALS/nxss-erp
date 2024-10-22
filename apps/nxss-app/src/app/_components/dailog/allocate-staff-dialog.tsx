"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ClerkAPIError } from "@clerk/types";
import { TRPCClientError } from "@trpc/client";
import {
  TRPCErrorResponse,
  TRPCErrorShape,
} from "@trpc/server/unstable-core-do-not-import";
import { CheckCircle2 } from "lucide-react";
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
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@nxss/ui/form";
import { Textarea } from "@nxss/ui/textarea";
import { toast } from "@nxss/ui/toast";
import { inviteSchema } from "@nxss/validators";

import { inviteMember } from "~/trpc/actions";

export function AllocateStaffDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, onChangeOpen] = useState(false);
  const { org } = useParams();

  const form = useForm({
    schema: inviteSchema,
    mode: "onChange",
  });

  async function onInviteMembers(values: z.infer<typeof inviteSchema>) {
    await Promise.all(
      values.emails
        .split(",")
        .map((email) => email.trim())
        .map(async (email) => {
          try {
            await inviteMember({
              slug: org as string,
              email,
            });
            toast.success("Invitation sent successfully", {
              description: `to ${email}`,
              icon: <CheckCircle2 />,
            });
          } catch (e) {
            const error = e as ClerkAPIError;
            console.log("invitation error:", error);
            toast.error(`${error}`, {
              description: `${error.longMessage}`,
            });
          }
        }),
    );
    onChangeOpen(false);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChangeOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Allocate Staff</DialogTitle>
          <DialogDescription>Allocate the staff for subject</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onInviteMembers)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="emails"
              disabled={form.formState.isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-24 resize-none"
                      placeholder="Type multiple emails seperated by commas"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button isLoading={form.formState.isSubmitting} type="submit">
                Allocate
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
