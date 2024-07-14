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
import { inviteSchema } from "@nxss/validators";

export function InviteDialog({ children }: { children: React.ReactNode }) {
  const form = useForm({
    schema: inviteSchema,
    mode: "onChange",
  });

  async function onInviteMembers(values: z.infer<typeof inviteSchema>) {}
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Staff Members</DialogTitle>
          <DialogDescription>
            Invite staff to your organization to collobrate & manage.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onInviteMembers)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="emails"
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
              <Button type="submit">Invite</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
