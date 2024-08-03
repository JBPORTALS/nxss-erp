import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { sql } from "drizzle-orm";

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

async function main() {
  console.log("Resetting tables 🧹");
  await Promise.all([
    reset("institutions"),
    reset("users"),
    reset("academic_years"),
    reset("branches"),
    reset("semesters"),
    reset("branch_to_sem"),
    reset("staff"),
  ]);

  console.log("Seeding institutions 🏫");
  const institutionIds = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      db
        .insert(institutions)
        .values({
          name: faker.company.name(),
          clerk_org_id: faker.string.uuid(),
        })
        .returning({ id: institutions.id })
    )
  );

  console.log("Seeding users 👥");
  await Promise.all(
    Array.from({ length: 20 }).map(() =>
      db.insert(users).values({
        id: faker.string.uuid(),
        full_name: faker.person.fullName(),
        date_of_birth: faker.date.past().toISOString(),
        year_of_join: faker.number.int({ min: 2015, max: 2024 }),
        phone_num: parseInt(faker.phone.number("##########")),
        is_phone_verified: faker.datatype.boolean(),
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.recent().toISOString(),
      })
    )
  );

  console.log("Seeding academic years 📅");
  await Promise.all(
    institutionIds.flatMap((inst) =>
      Array.from({ length: 3 }).map(() =>
        db.insert(academicYears).values({
          institution_id: inst[0]!.id,
          year: faker.date.future().getFullYear().toString(),
          pattern: faker.helpers.arrayElement(["semester", "annual"]),
          status: faker.helpers.arrayElement([
            "current",
            "completed",
            "upcoming",
          ]),
          start_date: faker.date.future().toISOString(),
          end_date: faker.date.future().toISOString(),
        })
      )
    )
  );

  console.log("Seeding branches 🌿");
  const branchIds = await Promise.all(
    institutionIds.flatMap((inst) =>
      Array.from({ length: 5 }).map(() =>
        db
          .insert(branches)
          .values({
            name: faker.word.noun(),
            institution_id: inst[0]!.id,
          })
          .returning({ id: branches.id, institution_id: branches.institution_id })
      )
    )
  );

  console.log("Seeding semesters 🗓️");
  const semesterIds = await Promise.all(
    branchIds.flatMap((branch) =>
      Array.from({ length: 8 }).map((_, index) =>
        db
          .insert(semesters)
          .values({
            institution_id: branch[0]!.institution_id,
            branch_id: branch[0]!.id,
            number: index + 1,
            status: faker.helpers.arrayElement([
              "current",
              "completed",
              "upcoming",
            ]),
          })
          .returning({ id: semesters.id, branch_id: semesters.branch_id })
      )
    )
  );

  console.log("Seeding branch_to_sem connections 🔗");
  await Promise.all(
    branchIds.flatMap((branch) =>
      semesterIds
        .filter((sem) => sem[0]!.branch_id === branch[0]!.id)
        .map((sem) =>
          db.insert(branch_to_sem).values({
            branch_id: branch[0]!.id,
            semester_id: sem[0]!.id,
            status: faker.helpers.arrayElement([
              "current",
              "completed",
              "upcoming",
            ]),
          })
        )
    )
  );

  console.log("Seeding staff 👨‍🏫");
  await Promise.all(
    Array.from({ length: 10 }).map(() =>
      db.insert(staff).values({
        full_name: faker.person.fullName(),
        staff_id: faker.string.alphanumeric(8),
        clerk_user_id: faker.string.uuid(),
        clerk_org_id: faker.helpers.arrayElement(institutionIds)[0]!.id.toString(),
        status: faker.helpers.arrayElement(["approved", "in_review", "rejected"]),
        docUrl: faker.internet.url(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      })
    )
  );
}

main()
  .then(() => console.log("Seed Completed Successfully ✅"))
  .catch((e) => {
    console.error("Seed Failed ❌");
    console.error(e);
  })
  .finally(() => {
    pool.end();
    process.exit(0);
  });
