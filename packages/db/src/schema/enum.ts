import { pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["active", "completed"]);
export const patternEnum = pgEnum("pattern", ["semester", "annual"]);
export const eventForEnum = pgEnum("event_for", ["all", "staff", "student"]);
export const eventTypeEnum = pgEnum("event_type", [
  "event",
  "opportunity",
  "holiday",
  "exam_schedule",
]);
export const audienceTypeEnum = pgEnum("audience_type", [
  "staff",
  "students",
  "all",
]);
