import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as auth from "./schema/auth";
import * as post from "./schema/post";
import * as staff from "./schema/staff";

export const schema = { ...auth, ...post, ...staff };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("Connection String not defined ❌");

const client = postgres(connectionString, { prepare: false, debug: true });
export const db = drizzle(client, { schema });
