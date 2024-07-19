import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const connectionString = process.env.DATABASE_URL;

console.log(connectionString);

if (!connectionString) throw new Error("Connection String not defined ❌");

export default {
  schema: "./src/schema",
  tablesFilter: ["nxss_*"],
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
} satisfies Config;
