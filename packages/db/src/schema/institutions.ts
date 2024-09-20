import { relations, sql } from "drizzle-orm";
import { integer, text, timestamp } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { academicYears } from "./academic-years";
import { branches } from "./branches";
import { patternEnum } from "./enum";
import { semesters } from "./semesters";

// Institution table
export const institutions = pgTable("institutions", {
  id: text("id").notNull().primaryKey(), // reference the clerk_org_id
  name: text("name").notNull().unique(),
  pattern: patternEnum("pattern").notNull(),
  semester_count: integer("semester_count").notNull(),
  created_by: text("created_by").notNull(), // store the Clerk user ID of the user who created the institution
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp("updated_at"),
});

export const institutionsRelations = relations(institutions, ({ many }) => ({
  academicYears: many(academicYears),
  branches: many(branches),
  semesters: many(semesters),
}));
