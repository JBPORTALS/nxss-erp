ALTER TABLE "nxss_students" ALTER COLUMN "full_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "nxss_students" ALTER COLUMN "email" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "nxss_students" ADD CONSTRAINT "nxss_students_email_unique" UNIQUE("email");