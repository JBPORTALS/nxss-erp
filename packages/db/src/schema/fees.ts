import { relations } from "drizzle-orm";
import { serial, text, decimal, date, timestamp } from "drizzle-orm/pg-core";
import { grievanceCategoryEnum, feeCategoryEnum, grievanceStatusEnum, paymentMethodEnum, studentFeeStatusEnum } from "./enum";
import { users, academicYears, branches, semesters } from "./auth";
import { pgTable } from "./_table";

// Grievance table
export const grievances = pgTable("grievances", {
  id: serial("id").primaryKey(),
  student_id: text("student_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  category: grievanceCategoryEnum("category").notNull(),
  content: text("content").notNull(),
  status: grievanceStatusEnum("status").notNull(),
  date_posted: date("date_posted").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

// Fee Structure table
export const feeStructures = pgTable("fee_structures", {
  id: serial("id").primaryKey(),
  academic_year_id: serial("academic_year_id").notNull().references(() => academicYears.id, { onDelete: 'cascade' }),
  branch_id: serial("branch_id").notNull().references(() => branches.id, { onDelete: 'cascade' }),
  semester_id: serial("semester_id").notNull().references(() => semesters.id, { onDelete: 'cascade' }),
  category: feeCategoryEnum("category").notNull(),
  amount: decimal("amount").notNull(),
  due_date: date("due_date").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

// Student Fee table
export const studentFees = pgTable("student_fees", {
  id: serial("id").primaryKey(),
  student_id: text("student_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  fee_structure_id: serial("fee_structure_id").notNull().references(() => feeStructures.id, { onDelete: 'cascade' }),
  amount_paid: decimal("amount_paid").notNull(),
  last_payment_date: date("last_payment_date"),
  status: studentFeeStatusEnum("status").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

// Fee Transaction table
export const feeTransactions = pgTable("fee_transactions", {
  id: serial("id").primaryKey(),
  student_fee_id: serial("student_fee_id").notNull().references(() => studentFees.id, { onDelete: 'cascade' }),
  amount: decimal("amount").notNull(),
  transaction_date: timestamp("transaction_date").notNull(),
  payment_method: paymentMethodEnum("payment_method").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const grievancesRelations = relations(grievances, ({ one }) => ({
  student: one(users, {
    fields: [grievances.student_id],
    references: [users.id],
  }),
}));

export const feeStructuresRelations = relations(feeStructures, ({ one }) => ({
  academicYear: one(academicYears, {
    fields: [feeStructures.academic_year_id],
    references: [academicYears.id],
  }),
  branch: one(branches, {
    fields: [feeStructures.branch_id],
    references: [branches.id],
  }),
  semester: one(semesters, {
    fields: [feeStructures.semester_id],
    references: [semesters.id],
  }),
}));

export const studentFeesRelations = relations(studentFees, ({ one }) => ({
  student: one(users, {
    fields: [studentFees.student_id],
    references: [users.id],
  }),
  feeStructure: one(feeStructures, {
    fields: [studentFees.fee_structure_id],
    references: [feeStructures.id],
  }),
}));

export const feeTransactionsRelations = relations(feeTransactions, ({ one }) => ({
  studentFee: one(studentFees, {
    fields: [feeTransactions.student_fee_id],
    references: [studentFees.id],
  }),
}));