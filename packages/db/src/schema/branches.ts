import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { pgTable } from "./_table";
import { Semesters } from "./semesters";

export const Branches = pgTable("branches", (t) => ({
  id: t
    .text()
    .$defaultFn(() => createId())
    .primaryKey(),
  title: t.text().notNull(),
  clerkInstitutionId: t.text().notNull(),
  noOfSemesters: t.integer().notNull(),
  createdAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => new Date()),
}));

//schemas
export const insertBranchSchema = createInsertSchema(Branches)
  .omit({ clerkInstitutionId: true })
  .and(z.object({ semesterStartsWith: z.enum(["even", "odd"]) }));
export const updateBranchSchema = createUpdateSchema(Branches, {
  id: z.string().min(1),
});

export const branchesRelations = relations(Branches, ({ one, many }) => ({
  Semesters: many(Semesters),
}));
