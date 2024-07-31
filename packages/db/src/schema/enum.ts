import { pgEnum } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', ['current', 'completed', 'upcoming']);
export const patternEnum = pgEnum('pattern', ['semester', 'annual']);