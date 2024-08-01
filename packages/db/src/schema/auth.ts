import { relations } from "drizzle-orm";
import { integer, serial, text ,timestamp,boolean,date} from "drizzle-orm/pg-core";
import { pgTable } from "./_table";
import { statusEnum, patternEnum } from "./enum";
import { datetime, time } from "drizzle-orm/mysql-core";

// Rest of your schema definitions...
//const userTypeEnum = pgEnum('user_type', ['student', 'admin']);

// Institution table
export const institutions = pgTable("institutions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  clerk_org_id: text("clerk_org_id").notNull(),
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
  institution_id: serial("institution_id").notNull().references(() => institutions.id),
  year: text("year").notNull(),
  pattern: patternEnum("pattern").notNull(), 
  status: statusEnum("status").notNull(),
  start_date: timestamp("start_date").notNull(),
  end_date: timestamp("end_date").notNull(),
});

// Branch table
export const branches = pgTable("branches", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  institution_id: serial("institution_id").notNull().references(() => institutions.id),
});

// Semester table
export const semesters = pgTable("semesters", {
  id: serial("id").primaryKey(),
  institution_id: serial("institution_id").notNull().references(() => institutions.id),
  branch_id: serial("branch_id").notNull().references(() => branches.id),
  number: integer("number").notNull(),
  status: statusEnum("status").notNull(),
});

// Connection table
export const branch_to_sem = pgTable("branch_to_sem", {
  id: serial("id").primaryKey(),
  branch_id: serial("branch_id").notNull().references(() => branches.id),
  semester_id: serial("semester_id").notNull().references(() => semesters.id),
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

export const semestersRelations = relations(semesters, ({ one, many }) => ({
  institution: one(institutions, {
    fields: [semesters.institution_id],
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