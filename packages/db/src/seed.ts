import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import pg from 'pg';
const { Pool } = pg;
import {
  institutions,
  users,
  academicYears,
  branches,
  semesters,
  branch_to_sem,
} from "./schema/auth";
import { staff } from "./schema/staff";

if (!process.env.SEED_MODE)
  throw new Error("Not in a SEED MODE, set a SEED_MODE env variable ❌");

if (!process.env.DATABASE_URL)
  throw new Error("set a DATABASE_URL env variable ❌");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function reset(tableName: string) {
  const query = sql`TRUNCATE TABLE ${sql.identifier(tableName)} RESTART IDENTITY CASCADE`;
  return db.execute(query);
}
const phoneNumber = faker.helpers.fromRegExp(/[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/);
async function main() {
  console.log("Resetting tables 🧹");
  await Promise.all([
    reset("nxss_institutions"),
    reset("nxss_users"),
    reset("nxss_academic_years"),
    reset("nxss_branches"),
    reset("nxss_semesters"),
    reset("nxss_branch_to_sem"),
    reset("nxss_staff"),
  ]);

  console.log("Seeding institutions 🏫");
  const institutionsData = await db
    .insert(institutions)
    .values(
      Array.from({ length:10 }, () => ({
        id: faker.string.uuid(),
        name: faker.company.name(),
      }))
    )
    .returning();

    console.log("Seeding users 👥");
    await db.insert(users).values(
      Array.from({ length: 50 }, () => ({
        id: faker.string.uuid(),
        full_name: faker.person.fullName(),
        date_of_birth: faker.date.past({ years: 30 }).toISOString().split('T')[0], // Convert to YYYY-MM-DD string
        year_of_join: faker.number.int({ min: 2010, max: 2024 }),
        phone_num: phoneNumber,      
        is_phone_verified: faker.datatype.boolean(),
      }))
    );
  
    console.log("Seeding academic years 📅");
    await db.insert(academicYears).values(
      
      institutionsData.flatMap((institution) =>
        Array.from({ length: 3 }, () => ({
          institution_id: institution.id,
          year: faker.date.future().getFullYear().toString(),
          pattern: faker.helpers.arrayElement(["semester", "annual"]) as "semester" | "annual",
          status: faker.helpers.arrayElement(["current", "completed", "upcoming"]) as "current" | "completed" | "upcoming",
          start_date: faker.date.future(),
          end_date: faker.date.future(),
        }))
      )
    );
    



  console.log("Seeding branches 🌿");
  const branchesData = await db
    .insert(branches)
    .values(
      institutionsData.flatMap((institution) =>
        Array.from({ length: 5 }, () => ({
          name: faker.commerce.department(),
          description: faker.lorem.sentence(),
          institution_id: institution.id,
        }))
      )
    )
    .returning();

  console.log("Seeding semesters 🗓️");
  const semestersData = await db
    .insert(semesters)
    .values(
      institutionsData.flatMap((institution) =>
        Array.from({ length: 8 }, (_, i) => ({
          institution_id: institution.id,
          number: i + 1,
        }))
      )
    )
    .returning();

    console.log("Seeding branch to semester connections 🔗");
await db.insert(branch_to_sem).values(
  branchesData.flatMap((branch) =>
    faker.helpers.arrayElements(semestersData, { min: 4, max: 8 }).map((semester) => ({
      branch_id: branch.id,
      semester_id: semester.id,
      status: faker.helpers.arrayElement(["current", "completed", "upcoming"]) as "current" | "completed" | "upcoming",
    }))
  )
);

console.log("Seeding staff 👨‍🏫");
await db.insert(staff).values(
  Array.from({ length: 20 }, () => ({
    full_name: faker.person.fullName(),
    staff_id: faker.string.alphanumeric(8).toUpperCase(),
    clerk_user_id: faker.string.uuid(),
    clerk_org_id: faker.helpers.arrayElement(institutionsData).id,
    status: faker.helpers.arrayElement(["approved", "in_review", "rejected"]) as "approved" | "in_review" | "rejected",
    docUrl: faker.image.url(),
  }))
);


  console.log("Seeding completed successfully ✅");
}

main()
  .then(() => console.log("Seed script finished"))
  .catch((e) => {
    console.error("Error in seed script:", e);
  })
  .finally(() => process.exit(0));