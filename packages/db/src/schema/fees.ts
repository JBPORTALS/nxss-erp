import { relations } from "drizzle-orm";
import { pgTable, uuid, text, decimal, date, timestamp } from "drizzle-orm/pg-core";
import { grievanceCategoryEnum,feeCategoryEnum,grievanceStatusEnum,paymentMethodEnum,studentFeeStatusEnum } from "./enum";
import { users, academicYears, branches, semesters } from "./auth";

// Enums


// Grievance table
export const grievances = pgTable("grievances", {
  id: uuid("id").primaryKey(),
  student_id: text("student_id").notNull(),
  category: grievanceCategoryEnum("category").notNull(),
  content: text("content").notNull(),
  status: grievanceStatusEnum("status").notNull(),
  date_posted: date("date_posted").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

// Fee Structure table
export const feeStructures = pgTable("fee_structures", {
  id: uuid("id").primaryKey(),
  academic_year_id: uuid("academic_year_id").notNull(),
  branch_id: uuid("branch_id").notNull(),
  semester_id: uuid("semester_id").notNull(),
  category: feeCategoryEnum("category").notNull(),
  amount: decimal("amount").notNull(),
  due_date: date("due_date").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

// Student Fee table
export const studentFees = pgTable("student_fees", {
  id: uuid("id").primaryKey(),
  student_id: text("student_id").notNull(),
  fee_structure_id: uuid("fee_structure_id").notNull(),
  amount_paid: decimal("amount_paid").notNull(),
  last_payment_date: date("last_payment_date"),
  status: studentFeeStatusEnum("status").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

// Fee Transaction table
export const feeTransactions = pgTable("fee_transactions", {
  id: uuid("id").primaryKey(),
  student_fee_id: uuid("student_fee_id").notNull(),
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