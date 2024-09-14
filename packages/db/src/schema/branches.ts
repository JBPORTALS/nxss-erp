import { relations } from "drizzle-orm";
import { integer, serial, text } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { statusEnum } from "./enum";
import { institutions } from "./institution";
import { semesters } from "./semesters";

// Branch table
export const branches = pgTable("branches", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  institution_id: text("institution_id")
    .notNull()
    .references(() => institutions.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

// Connection table
export const branch_to_sem = pgTable("branch_to_sem", {
  id: serial("id").primaryKey(),
  branch_id: serial("branch_id")
    .notNull()
    .references(() => branches.id, { onDelete: "cascade" }),
  semester_id: integer("semester_id").notNull(),
  status: statusEnum("status").notNull(),
});

export const branchesRelations = relations(branches, ({ one, many }) => ({
  institution: one(institutions, {
    fields: [branches.institution_id],
    references: [institutions.id],
  }),
  branch_to_sem: many(branch_to_sem),
}));

export const connectionsRelations = relations(branch_to_sem, ({ one }) => ({
  branch: one(branches, {
    fields: [branch_to_sem.branch_id],
    references: [branches.id],
  }),
  semester: one(semesters, {
    fields: [branch_to_sem.semester_id],
    references: [semesters.id],
  }),
}));
