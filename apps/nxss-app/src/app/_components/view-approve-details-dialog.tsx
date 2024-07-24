import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
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

export function ViewApproveDetailsDialog({
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
            console.log(e);
            toast.error(`Failed!`, {
              description: `couldn't able send invitation to ${email}`,
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
          <DialogTitle>Profile Approval</DialogTitle>
          <DialogDescription>
            Please see the details, which awaits your approval.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onInviteMembers)}
            className="space-y-3"
          >
            <div className="flex gap-3">
              <b>FirstName:</b>
              <span>Manoj</span>
            </div>
            <div className="flex gap-3">
              <b>LastName:</b>
              <span>M</span>
            </div>
            <div className="flex flex-col gap-3">
              <b>Indentification Document:</b>
              <div className="relative aspect-video w-full rounded-md border bg-muted">
                <Image fill src="/" alt="Indentification Document Image" />
              </div>
            </div>
            <DialogFooter>
              <Button variant={"outline"}>Reject</Button>
              <Button isLoading={form.formState.isSubmitting} type="submit">
                Approve
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
