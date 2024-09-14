import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "./env";
import * as AllSchema from "./schema";

export * from "./schema/enum";

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

export const schema = AllSchema;

const client = neon(env.DATABASE_URL);
export const db = drizzle(client, { schema });
