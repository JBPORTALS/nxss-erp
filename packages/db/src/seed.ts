import { faker } from "@faker-js/faker";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import {
  academicYears,
  batches,
  branch_to_sem,
  branches,
  institutions,
  sections,
  semesters,
  users,
} from "./schema/auth";
import { calendar, calendarBranches } from "./schema/calendar";
import { staff } from "./schema/staff";

const { Pool } = pg;

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

const phoneNumber = faker.helpers.fromRegExp(/[0-9]{10}/);

async function insertInBatches<T>(table: any, values: T[], batchSize = 1000) {
  for (let i = 0; i < values.length; i += batchSize) {
    const batch = values.slice(i, i + batchSize);
    try {
      await db.insert(table).values(batch);
    } catch (error) {
      console.error(`Error inserting batch into ${table.name}:`, error);
      throw error; // Re-throw error to stop execution if needed
    }
  }
}

async function main() {
  console.log("Resetting tables 🧹");
  await Promise.all([
    reset("nxss_calendar_branches"),
    reset("nxss_calendar"),
    reset("nxss_batches"),
    reset("nxss_sections"),
    reset("nxss_staff"),
    reset("nxss_branch_to_sem"),
    reset("nxss_semesters"),
    reset("nxss_branches"),
    reset("nxss_academic_years"),
    reset("nxss_users"),
    reset("nxss_institutions"),
  ]);

  console.log("Seeding institutions 🏫");
  const institutionsData = Array.from({ length: 1000 }, () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
  }));

  await insertInBatches(institutions, institutionsData);

  console.log("Seeding users 👥");
  const usersData = Array.from({ length: 500 }, () => ({
    id: faker.string.uuid(),
    full_name: faker.person.fullName(),
    date_of_birth: faker.date.past({ years: 30 }).toISOString().split("T")[0],
    year_of_join: Number(faker.number.int({ min: 2010, max: 2024 })),
    phone_num: phoneNumber.toString(), // Ensure phone_num is a string
    is_phone_verified: faker.datatype.boolean(),
  }));

  await insertInBatches(users, usersData);

  console.log("Seeding academic years 📅");

  const academicYearsData = institutionsData.flatMap((institution) =>
    Array.from({ length: 3 }, () => ({
      institution_id: institution.id,
      year: faker.date.future().getFullYear().toString(),
      pattern: faker.helpers.arrayElement(["semester", "annual"]),
      status: faker.helpers.arrayElement(["current", "completed", "upcoming"]),
      start_date: faker.date.future(),
      end_date: faker.date.future(),
    })),
  );

  await insertInBatches(academicYears, academicYearsData);

  console.log("Seeding branches 🌿");
  const branchesData = institutionsData.flatMap((institution) =>
    Array.from({ length: 5 }, () => ({
      institution_id: institution.id,
      name: faker.commerce.department(),
      description: faker.lorem.sentence(),
    })),
  );
  await insertInBatches(branches, branchesData);

  console.log("Seeding semesters 🗓️");
  const semestersData = institutionsData.flatMap((institution) =>
    Array.from({ length: 100 }, (_, i) => ({
      institution_id: institution.id,
      number: i + 1,
    })),
  );

  await insertInBatches(semesters, semestersData);

  console.log("Seeding branch to semester connections 🔗");
  // Retrieve branch and semester IDs

  console.log("Seeding branch to semester connections 🔗");
  const branchIds = (await db.select().from(branches)).map((row) => row.id);
  const semesterIds = (await db.select().from(semesters)).map((row) => row.id);

  const branchToSemData = branchIds.flatMap((branchId) =>
    faker.helpers
      .arrayElements(semesterIds, { min: 4, max: 8 })
      .map((semesterId) => ({
        branch_id: branchId,
        semester_id: semesterId,
        status: faker.helpers.arrayElement([
          "current",
          "completed",
          "upcoming",
        ]),
      })),
  );

  await insertInBatches(branch_to_sem, branchToSemData);

  console.log("Seeding staff 👨‍🏫");
  const staffData = Array.from({ length: 100 }, () => ({
    full_name: faker.person.fullName(),
    staff_id: faker.string.alphanumeric(8).toUpperCase(),
    clerk_user_id: faker.string.uuid(),
    clerk_org_id: faker.helpers.arrayElement(institutionsData).id,
    status: faker.helpers.arrayElement(["approved", "in_review", "rejected"]),
    docUrl: faker.image.url(),
  }));

  await insertInBatches(staff, staffData);

  console.log("Seeding sections 📚");
  const sectionsData = (await db.select().from(branches)).flatMap((branch) =>
    Array.from({ length: 3 }, () => ({
      name: faker.helpers.arrayElement(["A", "B", "C", "D"]),
      branch_id: branch.id,
      semester_id: faker.helpers.arrayElement(semesterIds),
    })),
  );
  await insertInBatches(sections, sectionsData);

  console.log("Seeding batches 👥");
  const batchesData = (await db.select().from(sections)).flatMap((section) =>
    Array.from({ length: 2 }, () => ({
      name: faker.helpers.arrayElement(["Batch 1", "Batch 2", "Batch 3"]),
      branch_id: section.branch_id,
      semester_id: section.semester_id,
      section_id: section.id,
    })),
  );
  await insertInBatches(batches, batchesData);

  console.log("Seeding calendar events 📅");
  const calendarData = Array.from({ length: 500 }, () => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    event_type: faker.helpers.arrayElement(["holiday", "exam", "event"]),
    audience_type: faker.helpers.arrayElement(["all", "student", "staff"]),
    is_all_day: faker.datatype.boolean(),
    start_date: faker.date.future(),
    end_date: faker.date.future(),
    location: faker.location.streetAddress(),
    attachment_url: faker.internet.url(),
  }));
  await insertInBatches(calendar, calendarData);

  console.log("Seeding calendar branches 🌿📅");
  const calendarBranchesData = calendarData.flatMap((calendarEvent) =>
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => {
      const branch = faker.helpers.arrayElement(branchIds);
      const semester = faker.helpers.arrayElement(semesterIds);
      const section = faker.helpers.arrayElement(["A", "B", "C", "D"]);
      const batch = faker.helpers.arrayElement([
        "Batch 1",
        "Batch 2",
        "Batch 3",
      ]);
      return {
        calendar_id: calendarEvent,
        branch_id: branch,
        semester_id: semester,
        section: section,
        batch: batch,
      };
    }),
  );
  await insertInBatches(calendarBranches, calendarBranchesData);

  console.log("Seeding completed successfully ✅");
}

main()
  .then(() => console.log("Seed script finished"))
  .catch((e) => {
    console.error("Error in seed script:", e);
  })
  .finally(() => process.exit(0));
