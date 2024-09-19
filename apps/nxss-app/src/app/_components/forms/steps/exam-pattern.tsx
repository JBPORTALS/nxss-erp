"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { Calendar, CalendarRange } from "lucide-react";
import { z } from "zod";

import { cn } from "@nxss/ui";
import { Button } from "@nxss/ui/button";
import { Form, FormControl, FormField, FormItem, useForm } from "@nxss/ui/form";
import { Label } from "@nxss/ui/label";
import { RadioGroup, RadioGroupItem } from "@nxss/ui/radio-group";
import { ChooseExamPatternScheme } from "@nxss/validators";

export default function ExamPatternStep({
  onNext,
  initialData,
}: {
  onNext: (data: any) => void;
  initialData: any;
}) {
  const form = useForm({
    schema: ChooseExamPatternScheme,
  });
  const { createOrganization, isLoaded, setActive } = useOrganizationList();

  const onSubmit = async (values: z.infer<typeof ChooseExamPatternScheme>) => {
    if (isLoaded) {
      const organization = await createOrganization({ name: initialData.name });
      setActive({ organization });
      onNext({
        examPattern: values.type,
        slug: organization.slug,
        imageUrl: organization.imageUrl,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-center text-2xl font-bold">Exam Pattern</h1>
        <p className="text-center text-sm text-muted-foreground">
          Select the exam pattern follow in <b>{initialData.name}</b>{" "}
          organization. Please choose once you can't change it later.
        </p>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    {...field}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-2"
                  >
                    <div
                      className={cn(
                        `flex items-center space-x-2 rounded-md border p-4`,
                        field.value === "annual"
                          ? "border-primary bg-accent"
                          : "border-input",
                      )}
                    >
                      <Label
                        htmlFor="annual"
                        className="flex flex-1 items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-6 w-6 text-indigo-600" />
                          <div>
                            <p className="text-sm font-medium leading-none">
                              Annual
                            </p>
                            <p className="text-sm text-muted-foreground">
                              One exam per year
                            </p>
                          </div>
                        </div>
                      </Label>
                      <RadioGroupItem value="annual" id="annual" />
                    </div>
                    <div
                      className={cn(
                        `flex items-center space-x-2 rounded-md border p-4`,
                        field.value === "semester"
                          ? "border-primary bg-accent"
                          : "border-input",
                      )}
                    >
                      <Label
                        htmlFor="semester"
                        className="flex flex-1 items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <CalendarRange className="h-6 w-6 text-green-600" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Semester
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Two exams per year
                            </p>
                          </div>
                        </div>
                      </Label>
                      <RadioGroupItem value="semester" id="semester" />
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          isLoading={form.formState.isSubmitting || form.formState.isValidating}
          size={"lg"}
        >
          Confirm
        </Button>
      </form>
    </Form>
  );
}
