import { relations } from "drizzle-orm";
import { 
  pgTable, 
  serial, 
  text, 
  integer, 
  decimal, 
  timestamp
} from "drizzle-orm/pg-core";

// Test Type table
export const testType = pgTable("test_type", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

// Test Type Subject table
export const testTypeSubject = pgTable("test_type_subject", {
  id: serial("id").primaryKey(),
  test_type_id: integer("test_type_id").notNull().references(() => testType.id),
  subject_id: integer("subject_id").notNull(), // References subject table
  max_marks: decimal("max_marks").notNull(),
  passing_marks: decimal("passing_marks").notNull(),
});

// Test table
export const test = pgTable("test", {
  id: serial("id").primaryKey(),
  unit_num: integer("unit_num").notNull(),
  max_marks: decimal("max_marks").notNull(),
  min_marks: decimal("min_marks").notNull(),
  test_type_subject_id: integer("test_type_subject_id").notNull().references(() => testTypeSubject.id),
  date_of_conduction: timestamp("date_of_conduction").notNull(),
});

// Marks table
export const marks = pgTable("marks", {
  id: serial("id").primaryKey(),
  student_id: integer("student_id").notNull(), // References user table
  test_type_subject_id: integer("test_type_subject_id").notNull().references(() => testTypeSubject.id),
  attained_marks: decimal("attained_marks").notNull(),
  created_at: timestamp("created_at").notNull(),
  updated_at: timestamp("updated_at"),
});

// Relations
export const testTypeRelations = relations(testType, ({ many }) => ({
  testTypeSubjects: many(testTypeSubject),
}));

export const testTypeSubjectRelations = relations(testTypeSubject, ({ one, many }) => ({
  testType: one(testType, {
    fields: [testTypeSubject.test_type_id],
    references: [testType.id],
  }),
  tests: many(test),
  marks: many(marks),
}));

export const testRelations = relations(test, ({ one }) => ({
  testTypeSubject: one(testTypeSubject, {
    fields: [test.test_type_subject_id],
    references: [testTypeSubject.id],
  }),
}));

export const marksRelations = relations(marks, ({ one }) => ({
  testTypeSubject: one(testTypeSubject, {
    fields: [marks.test_type_subject_id],
    references: [testTypeSubject.id],
  }),
}));
