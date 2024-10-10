import { neon, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "./env";
import * as schema from "./schema";

export * from "./schema/enum";

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const sql = neon(env.DATABASE_URL);
export const db = drizzle(sql, { schema });
export * as schema from "./schema";
