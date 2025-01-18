import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

import { env } from "./env";
import * as schema from "./schema";

neonConfig.webSocketConstructor = ws; // <-- this is the key bit

const pool = new Pool({ connectionString: env.DATABASE_URL });

export const db = drizzle({ client: pool, schema, casing: "snake_case" });

export * from "drizzle-orm";
export * as schema from "./schema";
