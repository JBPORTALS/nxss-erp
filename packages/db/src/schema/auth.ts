// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import { boolean, integer, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

/**
 * This is the schema where we track organizations current or completed academic years.
 */
export const academicYears = pgTable("academicYears", {
  id: uuid("id").primaryKey().defaultRandom(),
  year: integer("year").notNull(),
  orgId: text("orgId").notNull(),
  is_completed: boolean("is_completed").default(false).notNull(),
  completed_at: timestamp("completed_at"),
});

export const academicYearsRelations = relations(
  academicYears,
  ({ one }) => ({}),
);

/**
 * This is the schema where we track organizations current or completed semesters.
 */
export const semesters = pgTable("semesters", {
  id: uuid("id").primaryKey().defaultRandom(),
  sem: integer("sem").notNull(),
  orgId: text("orgId").notNull(),
  is_completed: boolean("is_completed").default(false).notNull(),
  completed_at: timestamp("completed_at"),
});

export const semestersRelations = relations(semesters, ({ one }) => ({}));

/**
 * This is the schema where we store branch details of all org's.
 */
export const branches = pgTable("branches", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: text("orgId").notNull(),
  name: text("name").notNull(),
});

export const branchesRelations = relations(branches, ({ one }) => ({}));
