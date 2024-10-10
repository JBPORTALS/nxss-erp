import { relations } from "drizzle-orm";
import { integer, serial, text, timestamp } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { branches } from "./branches";
import { semesters } from "./semesters";

export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  branch_id: integer("branch_id")
    .notNull()
    .references(() => branches.id, { onDelete: "cascade" }),
  semester_id: integer("semester_id")
    .notNull()
    .references(() => semesters.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

export const batches = pgTable("batches", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  section_id: integer("section_id")
    .notNull()
    .references(() => sections.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

export const sectionsRelations = relations(sections, ({ one, many }) => ({
  branch: one(branches, {
    fields: [sections.branch_id],
    references: [branches.id],
  }),
  semester: one(semesters, {
    fields: [sections.semester_id],
    references: [semesters.id],
  }),
  batches: many(batches), // One-to-many: a section can have many batches
}));

export const batchesRelations = relations(batches, ({ one }) => ({
  section: one(sections, {
    fields: [batches.section_id],
    references: [sections.id],
  }),
}));
