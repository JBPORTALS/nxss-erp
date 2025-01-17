import { sql } from "drizzle-orm";
import { serial, text, timestamp } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  full_name: text("full_name").notNull(),
  email: text("email").notNull(),
  phone_number: text("phone_number"),
  clerk_user_id: text("clerk_user_id"),
  clerk_org_id: text("clerk_org_id").notNull(),
  created_at: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp("updated_at"),
});
