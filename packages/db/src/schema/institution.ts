import { relations } from "drizzle-orm";
import { text } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { academicYears } from "./academic-years";
import { branches } from "./branches";
import { semesters } from "./semesters";

// Institution table
export const institutions = pgTable("institutions", {
  id: text("id").notNull().primaryKey(), // reference the clerk_org_id
  name: text("name").notNull(),
});

export const institutionsRelations = relations(institutions, ({ many }) => ({
  academicYears: many(academicYears),
  branches: many(branches),
  semesters: many(semesters),
}));
