import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { patternEnum, statusEnum } from "./enum";

// Rest of your schema definitions...
//const userTypeEnum = pgEnum('user_type', ['student', 'admin']);

// Institution table
export const institutions = pgTable("institutions", {
  id: text("id").notNull().primaryKey(), // reference the clerk_org_id
  name: text("name").notNull(),
});

// User table
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  full_name: text("full_name").notNull(),
  date_of_birth: date("date_of_birth"),
  year_of_join: integer("year_of_join"),
  phone_num: integer("phone_num"),
  is_phone_verified: boolean("is_phone_verified").default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

// Academic Year table
export const academicYears = pgTable("academic_years", {
  id: serial("id").primaryKey(),
  institution_id: text("institution_id")
    .notNull()
    .references(() => institutions.id, {
      onDelete: "cascade",
      onUpdate: "restrict",
    }),
  year: text("year").notNull(),
  pattern: patternEnum("pattern").notNull(),
  status: statusEnum("status").notNull(),
  start_date: timestamp("start_date"),
  end_date: timestamp("end_date"),
});

// Branch table
export const branches = pgTable("branches", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  institution_id: text("institution_id")
    .notNull()
    .references(() => institutions.id),
});

// Semester table
export const semesters = pgTable("semesters", {
  id: serial("id").primaryKey(),
  institution_id: text("institution_id")
    .notNull()
    .references(() => institutions.id, { onDelete: "cascade" }),
  branch_id: integer("branch_id")
    .notNull()
    .references(() => branches.id, { onDelete: "cascade" }), // Added branch_id field
  number: integer("number").notNull(),
});

//Sections Table
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
  branch_id: integer("branch_id")
    .notNull()
    .references(() => branches.id, { onDelete: "cascade" }),
  semester_id: integer("semester_id")
    .notNull()
    .references(() => semesters.id, { onDelete: "cascade" }),
  section_id: integer("section_id")
    .notNull()
    .references(() => sections.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
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

// Relations
export const institutionsRelations = relations(institutions, ({ many }) => ({
  academicYears: many(academicYears),
  branches: many(branches),
  semesters: many(semesters),
}));

export const academicYearsRelations = relations(academicYears, ({ one }) => ({
  institution: one(institutions, {
    fields: [academicYears.institution_id],
    references: [institutions.id],
  }),
}));

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

// Updated Semester Relations
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

// Updated Section Relations
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
