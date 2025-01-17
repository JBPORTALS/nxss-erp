import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

import { env } from "./src/env";

dotenv.config({ path: "../../.env" });

const connectionString = env.DATABASE_URL;

export default {
  schema: "./src/schema",
  tablesFilter: ["nxss_*"],
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: connectionString,
  },
  migrations: {
    prefix: "unix",
  },
} satisfies Config;
