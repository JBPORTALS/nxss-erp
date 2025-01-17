import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import { env } from "./env";
import * as schema from "./schema";

export * from "./schema/enum";

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const pool = new Pool({ connectionString: env.DATABASE_URL });

export const db = drizzle(pool, { schema, casing: "snake_case" });
export * as schema from "./schema";
