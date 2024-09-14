import { faker } from "@faker-js/faker";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { calendar, calendarBranches } from "./schema/calendar";
import { batches, sections } from "./schema/groups";
import {
  academicYears,
  branch_to_sem,
  branches,
  institutions,
  semesters,
  users,
} from "./schema/index";
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

async function insertInBatches<T>(table: any, values: T[], batchSize = 1000) {
  let allInserted = [];
  for (let i = 0; i < values.length; i += batchSize) {
    const batch = values.slice(i, i + batchSize);
    try {
      const inserted = await db.insert(table).values(batch).returning();
      allInserted = allInserted.concat(inserted);
    } catch (error) {
      console.error(`Error inserting batch into ${table.name}:`, error);
      throw error;
    }
  }
  return allInserted;
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
  const institutionsData = Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
  }));
  const insertedInstitutions = await insertInBatches(
    institutions,
    institutionsData,
  );

  console.log("Seeding users 👥");
  const usersData = Array.from({ length: 50 }, () => ({
    id: faker.string.uuid(),
    full_name: faker.person.fullName(),
    date_of_birth: faker.date.past({ years: 30 }),
    year_of_join: faker.number.int({ min: 2010, max: 2024 }),
    phone_num: faker.helpers.fromRegExp("+91##########"), // Generate a string phone number
    is_phone_verified: faker.datatype.boolean(),
  }));
  await insertInBatches(users, usersData);

  console.log("Seeding academic years 📅");
  const academicYearsData = insertedInstitutions.flatMap((institution) =>
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
  const branchesData = insertedInstitutions.flatMap((institution) =>
    Array.from({ length: 5 }, () => ({
      name: faker.commerce.department(),
      description: faker.lorem.sentence(),
      institution_id: institution.id,
    })),
  );
  const insertedBranches = await insertInBatches(branches, branchesData);

  console.log("Seeding semesters 🗓️");
  const semestersData = insertedBranches.flatMap((branch) =>
    Array.from({ length: 8 }, (_, i) => ({
      institution_id: branch.institution_id,
      branch_id: branch.id,
      number: i + 1,
    })),
  );
  const insertedSemesters = await insertInBatches(semesters, semestersData);

  console.log("Seeding branch to semester connections 🔗");
  const branchToSemData = insertedSemesters.map((semester) => ({
    branch_id: semester.branch_id,
    semester_id: semester.id,
    status: faker.helpers.arrayElement(["current", "completed", "upcoming"]),
  }));
  await insertInBatches(branch_to_sem, branchToSemData);

  console.log("Seeding staff 👨‍🏫");
  const staffData = Array.from({ length: 100 }, () => ({
    full_name: faker.person.fullName(),
    staff_id: faker.string.alphanumeric(8).toUpperCase(),
    clerk_user_id: faker.string.uuid(),
    clerk_org_id: faker.helpers.arrayElement(insertedInstitutions).id,
    status: faker.helpers.arrayElement(["approved", "in_review", "rejected"]),
    docUrl: faker.internet.url(),
  }));
  await insertInBatches(staff, staffData);

  console.log("Seeding sections 📚");
  const sectionsData = insertedSemesters.flatMap((semester) =>
    Array.from({ length: 3 }, () => ({
      name: faker.helpers.arrayElement(["A", "B", "C", "D"]),
      branch_id: semester.branch_id,
      semester_id: semester.id,
    })),
  );
  const insertedSections = await insertInBatches(sections, sectionsData);

  console.log("Seeding batches 👥");
  const batchesData = insertedSections.flatMap((section) =>
    Array.from({ length: 2 }, () => ({
      name: faker.helpers.arrayElement(["Batch 1", "Batch 2", "Batch 3"]),
      branch_id: section.branch_id,
      semester_id: section.semester_id,
      section_id: section.id,
    })),
  );
  await insertInBatches(batches, batchesData);

  console.log("Seeding calendar events 📅");
  const calendarData = Array.from({ length: 50 }, () => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    event_type: faker.helpers.arrayElement([
      "event",
      "opportunity",
      "holiday",
      "exam_schedule",
    ]),
    audience_type: faker.helpers.arrayElement(["staff", "students", "all"]),
    is_all_day: faker.datatype.boolean(),
    start_date: faker.date.future(),
    end_date: faker.date.future(),
    location: faker.location.streetAddress(),
    attachment_url: faker.internet.url(),
  }));
  const insertedCalendarEvents = await insertInBatches(calendar, calendarData);

  console.log("Seeding calendar branches 🌿📅");
  const calendarBranchesData = insertedCalendarEvents.flatMap((calendarEvent) =>
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => {
      const branch = faker.helpers.arrayElement(insertedBranches);
      const semester = faker.helpers.arrayElement(
        insertedSemesters.filter((s) => s.branch_id === branch.id),
      );
      return {
        calendar_id: calendarEvent.id,
        branch_id: branch.id,
        semester_id: semester.id,
        section: faker.helpers.arrayElement(["A", "B", "C", "D"]),
        batch: faker.helpers.arrayElement(["Batch 1", "Batch 2", "Batch 3"]),
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
