import { z } from "zod";

import type { DateRange } from "@nxss/ui/calendar";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const SignInSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  error: z.string().optional(),
});

export const ProfileDetailsSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  docUrl: z.string().min(1, "Required"),
  error: z.string().optional(),
});

export const InvitationSchema = z.object({
  error: z.string().optional(),
});

export const inviteSchema = z.object({
  emails: z
    .string()
    .min(1, "Required!")
    .refine((val) => {
      const emails = val.split(",").map((email) => email.trim());
      return emails.every(
        (email) => z.string().email().safeParse(email).success,
      );
    }, "One or more email addresses are invalid"),
});

export const CreateBranchScheme = z.object({
  name: z.string().min(1, "Required!"),
  description: z.string().optional(),
});

export const UpdateBranchScheme = z.object({
  id: z.string().min(1, "Required!"),
  name: z.string().min(1, "Required!"),
  description: z.string().optional(),
});

export const CreateSemesterScheme = z.object({
  number: z.number().min(1),
  institution_id: z.string().min(1),
  branch_id: z.number().min(1), // Ensure branch_id is included
});

export const UpdateSemesterScheme = z.object({
  id: z.number().min(1, "Semester ID is required!"),
  number: z.number().min(1, "Semester number must be a positive integer."),
  branch_id: z.number().optional(),
});
export const CreateSectionScheme = z.object({
  name: z.string().min(1),
  branch_id: z.number().min(1),
  semester_id: z.number().min(1),
});

export const UpdateSectionScheme = z.object({
  id: z.number().min(1),
  name: z.string().min(1).optional(),
  branch_id: z.number().min(1).optional(),
  semester_id: z.number().min(1).optional(),
});

export const CreateBatchScheme = z.object({
  name: z.string().min(1, "Name is required"),
  branch_id: z.number().min(1, "Branch ID is required"),
  semester_id: z.number().min(1, "Semester ID is required"),
  section_id: z.number().min(1, "Section ID is required"),
});

export const UpdateBatchScheme = z.object({
  id: z.number().min(1, "Batch ID is required"),
  name: z.string().min(1, "Name is required").optional(),
  branch_id: z.number().min(1, "Branch ID is required").optional(),
  semester_id: z.number().min(1, "Semester ID is required").optional(),
  section_id: z.number().min(1, "Section ID is required").optional(),
});

export const CreateCalendarEventScheme = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  event_type: z.enum(["event", "opportunity", "holiday", "exam_schedule"]),
  audience_type: z.enum(["staff", "students", "all"]),
  is_all_day: z.boolean().optional(),
  start_date: z.date(),
  end_date: z.date().optional(),
  location: z.string().optional(),
  attachment_url: z.string().optional(),
});

export const UpdateCalendarEventScheme = z.object({
  id: z.number().min(1, "Event ID is required"),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  event_type: z
    .enum(["event", "opportunity", "holiday", "exam_schedule"])
    .optional(),
  audience_type: z.enum(["staff", "students", "all"]).optional(),
  is_all_day: z.boolean().optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  location: z.string().optional(),
  attachment_url: z.string().optional(),
});

const datetime: z.ZodSchema<DateRange | undefined> = z.object({
  from: z.date({ required_error: "From date is required" }),
  to: z.date().optional(),
});

export const eventSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  datetime,
  location: z.string().optional(),
  includeTime: z.boolean(),
  scope: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
      {
        required_error: "Atlease one scope must be select",
      },
    )
    .min(1, "Atlease one scope must be select"),
});

export const CreateOrganizationScheme = z.object({
  name: z.string().min(1, "Required!"),
});

export const ChooseExamPatternScheme = z.object({
  type: z.enum(["annual", "semester"]),
  semester_count: z.string().min(1, "Select count value"),
});

export const CreateOrganizationBackendScheme = z.object({
  name: z.string().min(1, "Required!"),
  type: z.enum(["annual", "semester"]),
  semester_count: z.string().min(1, "Select count value"),
});
