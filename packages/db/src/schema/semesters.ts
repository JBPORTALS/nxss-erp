import { relations } from "drizzle-orm";
import { integer, serial } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { academicYears } from "./academic-years";
import { branches } from "./branches";
import { statusEnum } from "./enum";

// Semester table
export const semesters = pgTable("semesters", {
  id: serial("id").primaryKey(),
  academic_year_id: integer("academic_year_id")
    .notNull()
    .references(() => academicYears.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  branch_id: integer("branch_id")
    .notNull()
    .references(() => branches.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  number: integer("number").notNull(),
  status: statusEnum("status").notNull(),
});

export const semestersRelations = relations(semesters, ({ one }) => ({
  academicYear: one(academicYears, {
    fields: [semesters.academic_year_id],
    references: [academicYears.id],
  }),
  branch: one(branches, {
    fields: [semesters.branch_id],
    references: [branches.id],
  }),
}));
