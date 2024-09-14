import { relations } from "drizzle-orm";
import { integer, serial, text } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { institutions } from "./institutions";
import { semesters } from "./semesters";

// Branch table
export const branches = pgTable("branches", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  institution_id: text("institution_id")
    .notNull()
    .references(() => institutions.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const branchesRelations = relations(branches, ({ one, many }) => ({
  institution: one(institutions, {
    fields: [branches.institution_id],
    references: [institutions.id],
  }),
  semesters: many(semesters),
}));
