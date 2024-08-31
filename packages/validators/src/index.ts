import { z } from "zod";

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
  number: z.number().int().positive("Semester number is required"),
  institution_id: z.string().min(1, "Institution ID is required"),
});

export const UpdateSemesterScheme = z.object({
  id: z.number().int().positive("Semester ID is required"),
  number: z.number().int().positive("Semester number must be a positive integer"),
});

export const GetSemesterStatusScheme = z.object({
  semester_id: z.number().int().positive("Semester ID is required"),
  branch_id: z.number().int().positive("Branch ID is required"),
});

export const CreateSectionScheme = z.object({
  name: z.string().min(1, "Section name is required!"),
  branch_id: z.number().int().positive("Branch ID must be a positive integer"),
  semester_id: z.number().int().positive("Semester ID must be a positive integer"),
});

export const UpdateSectionScheme = z.object({
  id: z.number().int().positive("Section ID is required!"),
  name: z.string().min(1, "Section name is required!"),
  branch_id: z.number().int().positive("Branch ID must be a positive integer"),
  semester_id: z.number().int().positive("Semester ID must be a positive integer"),
});