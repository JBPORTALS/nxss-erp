DO $$ BEGIN
 CREATE TYPE "public"."audience_type" AS ENUM('staff', 'students', 'all');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
 CREATE TYPE "public"."fee_category" AS ENUM('TUITION', 'HOSTEL', 'LIBRARY', 'OTHER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."grievance_category" AS ENUM('ACADEMIC', 'HOSTEL', 'MESS', 'INFRASTRUCTURE', 'OTHER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."grievance_status" AS ENUM('PENDING', 'IN_PROGRESS', 'SOLVED', 'COMPLETED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."pattern" AS ENUM('semester', 'annual');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."payment_method" AS ENUM('CASH', 'ONLINE', 'CHEQUE', 'OTHER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('current', 'completed', 'upcoming');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."student_fee_status" AS ENUM('UNPAID', 'PAID', 'OVERDUE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."profileStatusEnum" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_academic_years" (
	"id" serial PRIMARY KEY NOT NULL,
	"institution_id" text NOT NULL,
	"year" text NOT NULL,
	"status" "status" NOT NULL,
	"start_date" timestamp,
	"end_date" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_branches" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '-',
	"institution_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_calendar" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"event_type" "event_type" NOT NULL,
	"audience_type" "audience_type" NOT NULL,
	"is_all_day" boolean DEFAULT false,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"location" text,
	"attachment_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_calendar_branches" (
	"id" serial PRIMARY KEY NOT NULL,
	"calendar_id" integer NOT NULL,
	"branch_id" integer NOT NULL,
	"semester_id" integer,
	"section" integer,
	"batch" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_batches" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"branch_id" integer NOT NULL,
	"semester_id" integer NOT NULL,
	"section_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"branch_id" integer NOT NULL,
	"semester_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_students" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text,
	"date_of_birth" date,
	"year_of_join" integer,
	"status" "profileStatusEnum" DEFAULT 'active',
	"clerk_user_id" text,
	"clerk_org_id" text NOT NULL,
	"branch_id" integer NOT NULL,
	"batch_id" integer,
	"current_semester_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_institutions" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"pattern" "pattern" NOT NULL,
	"semester_count" integer NOT NULL,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_staff" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text,
	"clerk_user_id" text,
	"clerk_org_id" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nxss_semesters" (
	"id" serial PRIMARY KEY NOT NULL,
	"academic_year_id" integer NOT NULL,
	"branch_id" integer NOT NULL,
	"number" integer NOT NULL,
	"status" "status" NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_academic_years" ADD CONSTRAINT "nxss_academic_years_institution_id_nxss_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."nxss_institutions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_branches" ADD CONSTRAINT "nxss_branches_institution_id_nxss_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."nxss_institutions"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
 ALTER TABLE "nxss_batches" ADD CONSTRAINT "nxss_batches_branch_id_nxss_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."nxss_branches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_batches" ADD CONSTRAINT "nxss_batches_semester_id_nxss_semesters_id_fk" FOREIGN KEY ("semester_id") REFERENCES "public"."nxss_semesters"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "nxss_semesters" ADD CONSTRAINT "nxss_semesters_academic_year_id_nxss_academic_years_id_fk" FOREIGN KEY ("academic_year_id") REFERENCES "public"."nxss_academic_years"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nxss_semesters" ADD CONSTRAINT "nxss_semesters_branch_id_nxss_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."nxss_branches"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
