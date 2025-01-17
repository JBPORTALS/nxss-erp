import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { pgTable } from "./_table";
import { Branches } from "./branches";
import { statusEnum } from "./enum";

// Semester table
export const Semesters = pgTable("semesters", (t) => ({
  id: t
    .text()
    .$defaultFn(() => createId())
    .primaryKey(),
  academicYear: t.text(),
  brancId: t
    .text()
    .notNull()
    .references(() => Branches.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  number: t.integer().notNull(),
  status: statusEnum("status").notNull(),
}));

//schemas
export const insertSemesterSchema = createInsertSchema(Semesters);
export const updateSemesterSchema = createInsertSchema(Semesters, {
  id: z.string().min(1, "Id must be provided"),
});

export const semestersRelations = relations(Semesters, ({ one }) => ({
  branch: one(Branches, {
    fields: [Semesters.brancId],
    references: [Branches.id],
  }),
}));
