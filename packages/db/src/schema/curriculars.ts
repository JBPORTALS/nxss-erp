
import { relations } from "drizzle-orm";
import { 
  pgTable, 
  uuid as serial, 
  text, 
  
  timestamp, 
  boolean, 
  
} from "drizzle-orm/pg-core";

// Enums
import { eventForEnum } from "./enum";

// Circular table
export const circular = pgTable("circular", {
    id: serial("id").primaryKey(),
    uid: serial("uid").notNull(), // References user table
    content: text("content").notNull(),
    media_url: text("media_url"),
    created_at: timestamp("created_at").defaultNow().notNull(),
  });
  
  // Event table
  export const event = pgTable("event", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    start_datetime: timestamp("start_datetime").notNull(),
    end_datetime: timestamp("end_datetime").notNull(),
    location: text("location"),
    event_for: eventForEnum("event_for").notNull(),
    branch_id: serial("branch_id"), // Nullable, references branch table
    semester_id: serial("semester_id"), // Nullable, references semester table
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at"),
  });
  
  // User Event Interest table
  export const userEventInterest = pgTable("user_event_interest", {
    id: serial("id").primaryKey(),
    event_id: serial("event_id").notNull().references(() => event.id),
    user_id: text("user_id").notNull(), // References user table
    interested: boolean("interested").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at"),
  });
  export const eventRelations = relations(event, ({ many }) => ({
    userEventInterests: many(userEventInterest),
  }));
  
  export const userEventInterestRelations = relations(userEventInterest, ({ one }) => ({
    event: one(event, {
      fields: [userEventInterest.event_id],
      references: [event.id],
    }),
  }));