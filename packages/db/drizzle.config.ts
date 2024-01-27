import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("Connection String not defined ❌");

export default {
  schema: "./src/schema",
  driver: "pg",
  dbCredentials: { connectionString },
  tablesFilter: ["nxss_*"],
} satisfies Config;
