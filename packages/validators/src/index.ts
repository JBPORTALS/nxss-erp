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
  branchId: z.number().min(1, "Branch ID is required").optional(),
  semesterId: z.number().min(1, "Semester ID is required").optional(),
  sectionId: z.number().min(1, "Section ID is required").optional(),
});

export const CreateCalendarEventScheme = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  eventType: z.enum(["event", "opportunity", "holiday", "exam_schedule"]),
  scope: z
    .object({
      branchId: z.number().optional(),
      semesterId: z.number().optional(),
      sectionId: z.number().optional(),
      batchId: z.number().optional(),
    })
    .optional(),
  audience_type: z.enum(["staff", "students", "all"]),
  is_all_day: z.boolean().optional(),
  start_date: z.date(),
  end_date: z.date().optional(),
  location: z.string().optional(),
  attachment_url: z.string().optional(),
});

const datetime: z.ZodSchema<DateRange | undefined> = z.object({
  from: z.date({ required_error: "From date is required" }),
  to: z.date().optional(),
});

const baseEventSchema = z.object({
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  datetime,
  location: z.string().optional(),
  includeTime: z.boolean(),
  attachmentUrl: z.string().optional(),
});

const scopeSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const studentEventSchema = baseEventSchema.extend({
  audienceType: z.literal("students"),
  scope: z
    .array(scopeSchema)
    .min(1, "At least one scope must be selected for student events"),
});

const staffEventSchema = baseEventSchema.extend({
  audienceType: z.literal("staff"),
  scope: z
    .array(scopeSchema)
    .min(1, "At least one scope must be selected for student events"),
});

const allAudienceEventSchema = baseEventSchema.extend({
  audienceType: z.literal("all"),
  scope: z.array(scopeSchema).optional(),
});

export const eventSchema = z.discriminatedUnion("audienceType", [
  studentEventSchema,
  staffEventSchema,
  allAudienceEventSchema,
]);

const updateBaseSchema = z.object({
  id: z.number().min(1, "ID is required"),
  eventType: z.enum(["event", "opportunity", "holiday", "exam_schedule"]),
  scope: z
    .object({
      branchId: z.number().optional(),
      semesterId: z.number().optional(),
      sectionId: z.number().optional(),
      batchId: z.number().optional(),
    })
    .optional(),
  audienceType: z.enum(["all", "students", "staff"]),
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

// export const UpdateCalendarEventScheme = eventSchema.transform((arg) => {
//   return {
//     ...arg,
//     id: z.number().min(1, "ID is required"),
//
//   };
// });

export const UpdateCalendarEventScheme =
  baseEventSchema.merge(updateBaseSchema);
