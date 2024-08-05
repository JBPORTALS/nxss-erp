import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "./env";
import * as auth from "./schema/auth";
import * as staff from "./schema/staff";

export * from "./schema/enum";

export const schema = { ...auth, ...staff };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const client = neon(env.DATABASE_URL);
export const db = drizzle(client, { schema });
