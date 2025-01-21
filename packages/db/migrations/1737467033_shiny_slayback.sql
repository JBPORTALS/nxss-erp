ALTER TABLE "nxss_semesters" RENAME COLUMN "branc_id" TO "branch_id";--> statement-breakpoint
ALTER TABLE "nxss_subjects" RENAME COLUMN "branc_id" TO "branch_id";--> statement-breakpoint
ALTER TABLE "nxss_subjects" RENAME COLUMN "semester" TO "semester_id";--> statement-breakpoint
ALTER TABLE "nxss_semesters" DROP CONSTRAINT "nxss_semesters_branc_id_nxss_branches_id_fk";
--> statement-breakpoint
ALTER TABLE "nxss_subjects" DROP CONSTRAINT "nxss_subjects_branc_id_nxss_branches_id_fk";
--> statement-breakpoint
ALTER TABLE "nxss_semesters" ALTER COLUMN "status" SET DEFAULT 'inactive';--> statement-breakpoint
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
