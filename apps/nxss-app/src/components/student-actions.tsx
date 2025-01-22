import { ShieldCheckIcon, ShieldMinusIcon } from "lucide-react";

import { RouterOutputs } from "@nxss/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@nxss/ui/alert-dialog";
import { buttonVariants } from "@nxss/ui/button";
import { toast } from "@nxss/ui/toast";

import { api } from "~/trpc/react";

export function ToggleStudentStatusAlertDialog({
  children,
  open,
  onOpenChange,
  studentId,
  status,
}: {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  studentId: string;
  status: RouterOutputs["students"]["getAll"][0]["status"];
}) {
  const utils = api.useUtils();
  const { mutateAsync: toggleStatus, isPending } =
    api.students.update.useMutation({
      onSuccess: async () => {
        await utils.students.invalidate();
        status === "active"
          ? toast.success("Student activated successfully")
          : toast.info("Student deactivated successfully");
      },
      onError() {
        status === "active"
          ? toast.error("Failed to activate student")
          : toast.error("Failed to deactivate student");
      },
    });
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {status === "inactive"
              ? "Your about to deactivate a student. Student no longer will be able to access the platform."
              : "Your about to activate a student. Student will be able to access the platform."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {status === "active" ? (
            <AlertDialogAction
              isLoading={isPending}
              loadingText="Processing..."
              className="bg-success/30 hover:bg-success/35 text-success"
              onClick={() => {
                toggleStatus({ id: studentId, status: "active" });
              }}
            >
              <ShieldCheckIcon className="size-5" />
              Activate
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              isLoading={isPending}
              loadingText="Processing..."
              className="bg-warning/30 hover:bg-warning/35 text-warning"
              onClick={() => {
                toggleStatus({ id: studentId, status: "inactive" });
              }}
            >
              <ShieldMinusIcon className="size-5" />
              Deactivate
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DeleteStudentAlertDialog({
  children,
  open,
  onOpenChange,
  studentId,
}: {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  studentId: string;
}) {
  const utils = api.useUtils();
  const { mutateAsync: deleteStudent, isPending } =
    api.students.delete.useMutation({
      onSuccess: async () => {
        await utils.students.invalidate();
        toast.info("Student deleted successfully");
      },
      onError() {
        toast.error("Failed to delete student");
      },
    });
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Your about to delete a student. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            isLoading={isPending}
            loadingText="Processing..."
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => {
              deleteStudent({ id: studentId });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
