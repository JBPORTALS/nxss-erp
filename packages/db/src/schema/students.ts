import { date, integer, serial, text, timestamp } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  full_name: text("full_name").notNull(),
  email: text("email").notNull(),
  phone_number: text("phone_number"),
  date_of_birth: date("date_of_birth"),
  year_of_join: integer("year_of_join"),
  clerk_user_id: text("clerk_user_id"),
  clerk_org_id: text("clerk_org_id").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});
