import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";

import { pgTable } from "./_table";
import { Branches } from "./branches";
import { Semesters } from "./semesters";

export const Sections = pgTable("sections", (t) => ({
  id: t
    .text()
    .$defaultFn(() => createId())
    .primaryKey(),
  name: t.text().notNull(),
  branchId: t
    .text()
    .notNull()
    .references(() => Branches.id, { onDelete: "cascade" }),
  semesterId: t
    .text()
    .notNull()
    .references(() => Semesters.id, { onDelete: "cascade" }),
  createdAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => new Date()),
}));

export const Batches = pgTable("batches", (t) => ({
  id: t
    .text()
    .$defaultFn(() => createId())
    .primaryKey(),
  name: t.text("name").notNull(),
  section_id: t
    .text("section_id")
    .notNull()
    .references(() => Sections.id, { onDelete: "cascade" }),
  createdAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => new Date()),
}));

export const sectionsRelations = relations(Sections, ({ one, many }) => ({
  Branch: one(Branches, {
    fields: [Sections.branchId],
    references: [Branches.id],
  }),
  Semester: one(Semesters, {
    fields: [Sections.semesterId],
    references: [Semesters.id],
  }),
  Batches: many(Batches), // One-to-many: a section can have many batches
}));

export const batchesRelations = relations(Batches, ({ one }) => ({
  Section: one(Sections, {
    fields: [Batches.section_id],
    references: [Sections.id],
  }),
}));
