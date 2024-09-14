import { relations } from "drizzle-orm";
import { integer, serial, text } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { branch_to_sem, branches } from "./branches";
import { batches, sections } from "./groups";
import { institutions } from "./institutions";

// Semester table
export const semesters = pgTable("semesters", {
  id: serial("id").primaryKey(),
  institution_id: text("institution_id")
    .notNull()
    .references(() => institutions.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  branch_id: integer("branch_id")
    .notNull()
    .references(() => branches.id, { onDelete: "cascade" }), // Added branch_id field
  number: integer("number").notNull(),
});

export const semestersRelations = relations(semesters, ({ one, many }) => ({
  institution: one(institutions, {
    fields: [semesters.institution_id],
    references: [institutions.id],
  }),
  branch: one(branches, {
    fields: [semesters.branch_id],
    references: [branches.id],
  }),
  sections: many(sections), // One-to-many: a semester can have many sections
  batches: many(batches), // One-to-many: a semester can have many batches
  branch_to_sem: many(branch_to_sem),
}));
