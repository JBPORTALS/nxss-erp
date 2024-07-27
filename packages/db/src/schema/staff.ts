import { sql } from "drizzle-orm";
import { pgEnum, serial, text, timestamp } from "drizzle-orm/pg-core";

import { pgTable } from "./_table";

export const StatusEnum = pgEnum("StatusEnum", [
  "approved",
  "in_review",
  "rejected",
]);

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  full_name: text("full_name"),
  staff_id: text("staff_id"),
  clerk_user_id: text("clerk_user_id").notNull(),
  clerk_org_id: text("clerk_org_id").notNull(),
  status: StatusEnum("status"),
  docUrl: text("docUrl"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
});
