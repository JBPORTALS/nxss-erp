import { relations } from "drizzle-orm";
import { integer, serial, text, timestamp } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { patternEnum, statusEnum } from "./enum";
import { institutions } from "./institutions";
import { semesters } from "./semesters";

// Academic Year table
export const academicYears = pgTable("academic_years", {
  id: serial("id").primaryKey(),
  institution_id: text("institution_id")
    .notNull()
    .references(() => institutions.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  year: text("year").notNull(),

  status: statusEnum("status").notNull(),
  start_date: timestamp("start_date"),
  end_date: timestamp("end_date"),
});

export const academicYearsRelations = relations(
  academicYears,
  ({ one, many }) => ({
    institution: one(institutions, {
      fields: [academicYears.institution_id],
      references: [institutions.id],
    }),
    semesters: many(semesters),
  }),
);
