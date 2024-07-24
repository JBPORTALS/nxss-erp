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
  lastName: z.string().min(1),
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
