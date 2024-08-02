"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { LoaderPinwheelIcon } from "lucide-react";
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
import { Form, useForm } from "@nxss/ui/form";
import { toast } from "@nxss/ui/toast";

import { completeVerification } from "~/trpc/actions";
import { api } from "~/trpc/react";

export function ViewApproveDetailsDialog({
  children,
  staffId,
}: {
  children: React.ReactNode;
  staffId: string;
}) {
  const [isOpen, onChangeOpen] = useState(false);

  const { data, isPending } = api.organization.getStaffProfileDetails.useQuery(
    {
      clerk_staff_user_id: staffId,
    },
    {
      enabled: !!staffId && isOpen,
    },
  );

  const form = useForm({
    schema: z.object({}),
    mode: "onChange",
  });

  async function onApproveTheProfile() {
    try {
      await completeVerification({ staffId });
      toast.success(`Profile approved successfully`, {
        description: `${data?.email} profile approved and now verified member of the institution.`,
      });
    } catch (e: any) {
      toast.error("Something went wrong", { description: e.message });
    }
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
            onSubmit={form.handleSubmit(onApproveTheProfile)}
            className="space-y-3"
          >
            {isPending ? (
              <div className="flex items-center justify-center py-20">
                <LoaderPinwheelIcon className="size-10 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="flex gap-3">
                  <b>FirstName:</b>
                  <span>{data?.firstName}</span>
                </div>
                <div className="flex gap-3">
                  <b>LastName:</b>
                  <span>{data?.lastName}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <b>Indentification Document:</b>
                  <div className="relative aspect-video w-full rounded-md border bg-muted">
                    <Image
                      fill
                      src={data?.docUrl ?? ""}
                      alt="Indentification Document Image"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant={"outline"}>Reject</Button>
                  <Button isLoading={form.formState.isSubmitting} type="submit">
                    Approve
                  </Button>
                </DialogFooter>
              </>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
