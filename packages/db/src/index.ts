import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "./env";
import * as auth from "./schema/auth";
import * as staff from "./schema/staff";
export * from "./schema/enum";
export const schema = { ...auth,  ...staff };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const client = postgres(env.DATABASE_URL, { prepare: false, debug: true });
export const db = drizzle(client, { schema });
