import { relations } from "drizzle-orm";
import { serial, text, timestamp } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { patternEnum, statusEnum } from "./enum";
import { institutions } from "./institution";

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
  pattern: patternEnum("pattern").notNull(),
  status: statusEnum("status").notNull(),
  start_date: timestamp("start_date"),
  end_date: timestamp("end_date"),
});

export const academicYearsRelations = relations(academicYears, ({ one }) => ({
  institution: one(institutions, {
    fields: [academicYears.institution_id],
    references: [institutions.id],
  }),
}));
