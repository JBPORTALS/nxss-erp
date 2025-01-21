DO $$ BEGIN
CREATE TYPE "public"."event_for" AS ENUM('all', 'staff', 'student');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
CREATE TYPE "public"."event_type" AS ENUM('event', 'opportunity', 'holiday', 'exam_schedule');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
CREATE TYPE "public"."user_type" AS ENUM('staff', 'students', 'all');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
CREATE TYPE "public"."profile_status_enum" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_branches" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"clerk_institution_id" text NOT NULL,
	"no_of_semesters" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_calendar" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"event_type" "event_type" NOT NULL,
	"audience_type" "user_type" NOT NULL,
	"is_all_day" boolean DEFAULT false,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"location" text,
	"attachment_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_calendar_branches" (
	"id" text PRIMARY KEY NOT NULL,
	"calendar_id" text NOT NULL,
	"branch_id" text,
	"semester_id" text,
	"section" text,
	"batch" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_batches" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"section_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_sections" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"branch_id" text NOT NULL,
	"semester_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_students" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text,
	"dob" date,
	"year_of_join" integer,
	"status" "profile_status_enum" DEFAULT 'active',
	"clerk_user_id" text,
	"clerk_institution_id" text NOT NULL,
	"branch_id" text NOT NULL,
	"batch_id" text,
	"current_semester_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_semesters" (
	"id" text PRIMARY KEY NOT NULL,
	"academic_year" text,
	"branch_id" text NOT NULL,
	"number" integer NOT NULL,
	"status" "profile_status_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_subjects" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"branch_id" text NOT NULL,
	"semester_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_calendar_branches" ADD CONSTRAINT "nxss_calendar_branches_calendar_id_nxss_calendar_id_fk" FOREIGN KEY ("calendar_id") REFERENCES "public"."nxss_calendar"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_calendar_branches" ADD CONSTRAINT "nxss_calendar_branches_branch_id_nxss_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."nxss_branches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_calendar_branches" ADD CONSTRAINT "nxss_calendar_branches_semester_id_nxss_semesters_id_fk" FOREIGN KEY ("semester_id") REFERENCES "public"."nxss_semesters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_calendar_branches" ADD CONSTRAINT "nxss_calendar_branches_section_nxss_sections_id_fk" FOREIGN KEY ("section") REFERENCES "public"."nxss_sections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_calendar_branches" ADD CONSTRAINT "nxss_calendar_branches_batch_nxss_batches_id_fk" FOREIGN KEY ("batch") REFERENCES "public"."nxss_batches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_batches" ADD CONSTRAINT "nxss_batches_section_id_nxss_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."nxss_sections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_sections" ADD CONSTRAINT "nxss_sections_branch_id_nxss_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."nxss_branches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_sections" ADD CONSTRAINT "nxss_sections_semester_id_nxss_semesters_id_fk" FOREIGN KEY ("semester_id") REFERENCES "public"."nxss_semesters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_students" ADD CONSTRAINT "nxss_students_branch_id_nxss_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."nxss_branches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_students" ADD CONSTRAINT "nxss_students_batch_id_nxss_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."nxss_batches"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_students" ADD CONSTRAINT "nxss_students_current_semester_id_nxss_semesters_id_fk" FOREIGN KEY ("current_semester_id") REFERENCES "public"."nxss_semesters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_semesters" ADD CONSTRAINT "nxss_semesters_branch_id_nxss_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."nxss_branches"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_subjects" ADD CONSTRAINT "nxss_subjects_branch_id_nxss_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."nxss_branches"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_subjects" ADD CONSTRAINT "nxss_subjects_semester_id_nxss_semesters_id_fk" FOREIGN KEY ("semester_id") REFERENCES "public"."nxss_semesters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
