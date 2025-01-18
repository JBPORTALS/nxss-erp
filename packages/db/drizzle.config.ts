import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

import { env } from "./src/env";

dotenv.config({ path: "../../.env" });

const url = env.DATABASE_URL;

export default {
  schema: "./src/schema",
  out: "./migrations",
  tablesFilter: ["nxss_*"],
  dialect: "postgresql",
  dbCredentials: { url },
  casing: "snake_case",
  migrations: {
    prefix: "unix",
  },
} satisfies Config;
