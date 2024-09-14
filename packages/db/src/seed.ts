import { faker } from "@faker-js/faker";
import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { PgTable } from "drizzle-orm/pg-core";
import pg from "pg";

import {
  academicYears,
  batches,
  branches,
  calendar,
  calendarBranches,
  institutions,
  sections,
  semesters,
  staff,
  students,
} from "./schema/index";

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

async function insertInBatches<T extends PgTable<any>>(
  table: T,
  values: InferInsertModel<T>[],
  batchSize = 1000,
): Promise<InferSelectModel<T>[]> {
  let allInserted: InferSelectModel<T>[] = [];
  for (let i = 0; i < values.length; i += batchSize) {
    const batch = values.slice(i, i + batchSize);
    try {
      const inserted = await db.insert(table).values(batch).returning();
      allInserted = allInserted.concat(inserted);
    } catch (error) {
      console.error(`Error inserting batch into ${table._.name}:`, error);
      throw error;
    }
  }
  return allInserted;
}

async function resetAllTables() {
  // Reset tables in reverse order of their dependencies
  const tableNames = [
    "nxss_calendar_branches",
    "nxss_calendar",
    "nxss_batches",
    "nxss_sections",
    "nxss_semesters",
    "nxss_staff",
    "nxss_students",
    "nxss_branches",
    "nxss_academic_years",
    "nxss_institutions",
  ];

  for (const tableName of tableNames) {
    try {
      await reset(tableName);
      console.log(`Reset ${tableName} successfully`);
    } catch (error) {
      console.error(`Error resetting ${tableName}:`, error);
      throw error;
    }
  }
}

async function main() {
  console.log("Resetting tables 🧹");
  await resetAllTables();

  console.log("Seeding institutions 🏫");
  const institutionsData = Array.from<
    unknown,
    typeof institutions.$inferInsert
  >({ length: 10 }, () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    created_by: faker.string.uuid(),
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  }));
  const insertedInstitutions = await insertInBatches(
    institutions,
    institutionsData,
  );

  console.log("Seeding academic years 📅");
  const academicYearsData = insertedInstitutions.flatMap(
    (institution: typeof institutions.$inferSelect) =>
      Array.from<unknown, typeof academicYears.$inferInsert>(
        { length: 3 },
        () => ({
          institution_id: institution.id,
          year: faker.date.future().getFullYear().toString(),
          pattern: faker.helpers.arrayElement(["semester", "annual"]),
          semester_count: faker.number.int({ min: 1, max: 3 }),
          status: faker.helpers.arrayElement([
            "current",
            "completed",
            "upcoming",
          ]),
          start_date: faker.date.future(),
          end_date: faker.date.future(),
        }),
      ),
  );
  const insertedAcademicYears = await insertInBatches(
    academicYears,
    academicYearsData,
  );

  console.log("Seeding branches 🌿");
  const branchesData = insertedInstitutions.flatMap(
    (institution: typeof institutions.$inferSelect) =>
      Array.from<unknown, typeof branches.$inferInsert>({ length: 5 }, () => ({
        name: faker.commerce.department(),
        institution_id: institution.id,
        description: faker.helpers.arrayElement([
          undefined,
          faker.commerce.productDescription(),
        ]),
      })),
  );
  const insertedBranches = await insertInBatches(branches, branchesData);

  console.log("Seeding semesters 🗓️");
  const semestersData = insertedAcademicYears.flatMap(
    (academicYear: typeof academicYears.$inferSelect) =>
      insertedBranches
        .filter(
          (branch) => branch.institution_id === academicYear.institution_id,
        )
        .flatMap((branch) =>
          Array.from<unknown, typeof semesters.$inferInsert>(
            { length: academicYear.semester_count },
            (_, i) => ({
              academic_year_id: academicYear.id,
              branch_id: branch.id,
              number: i + 1,
              status: faker.helpers.arrayElement([
                "current",
                "completed",
                "upcoming",
              ]),
            }),
          ),
        ),
  );
  const insertedSemesters = await insertInBatches(semesters, semestersData);

  console.log("Seeding sections 📚");
  const sectionsData = insertedSemesters.flatMap(
    (semester: typeof semesters.$inferSelect) =>
      Array.from<unknown, typeof sections.$inferInsert>({ length: 3 }, () => ({
        name: faker.helpers.arrayElement(["A", "B", "C", "D"]),
        branch_id: semester.branch_id,
        semester_id: semester.id,
      })),
  );
  const insertedSections = await insertInBatches(sections, sectionsData);

  console.log("Seeding batches 👥");
  const batchesData = insertedSections.flatMap(
    (section: typeof sections.$inferSelect) =>
      Array.from<unknown, typeof batches.$inferInsert>({ length: 2 }, () => ({
        name: faker.helpers.arrayElement(["Batch 1", "Batch 2", "Batch 3"]),
        branch_id: section.branch_id,
        semester_id: section.semester_id,
        section_id: section.id,
      })),
  );
  await insertInBatches(batches, batchesData);

  console.log("Seeding students 🎓");
  const studentsData = Array.from<unknown, typeof students.$inferInsert>(
    { length: 500 },
    () => ({
      full_name: faker.person.fullName(),
      email: faker.internet.email(),
      phone_number: faker.phone.number(),
      date_of_birth: faker.date
        .between({
          from: new Date(2001, 0, 1),
          to: new Date(2005, 11, 31),
        })
        .toISOString()
        .split("T")[0], // Convert to YYYY-MM-DD format
      year_of_join: faker.number.int({ min: 2010, max: 2024 }),
      clerk_user_id: faker.string.uuid(),
      clerk_org_id: faker.helpers.arrayElement(insertedInstitutions).id,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    }),
  );
  await insertInBatches(students, studentsData);

  console.log("Seeding staff 👨‍🏫");
  const staffData = Array.from<unknown, typeof staff.$inferInsert>(
    { length: 100 },
    () => ({
      full_name: faker.person.fullName(),
      email: faker.internet.email(),
      phone_number: faker.phone.number(),
      clerk_user_id: faker.string.uuid(),
      clerk_org_id: faker.helpers.arrayElement(insertedInstitutions).id,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    }),
  );
  await insertInBatches(staff, staffData);

  console.log("Seeding calendar events 📅");
  const calendarData = Array.from<unknown, typeof calendar.$inferInsert>(
    { length: 50 },
    () => ({
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
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    }),
  );
  const insertedCalendarEvents = await insertInBatches(calendar, calendarData);

  console.log("Seeding calendar branches 🌿📅");
  const calendarBranchesData = insertedCalendarEvents.flatMap(
    (calendarEvent: typeof calendar.$inferSelect) =>
      Array.from<unknown, typeof calendarBranches.$inferInsert>(
        { length: faker.number.int({ min: 1, max: 5 }) },
        () => {
          const branch = faker.helpers.arrayElement(insertedBranches);
          const semester = faker.helpers.arrayElement(
            insertedSemesters.filter((s) => s.branch_id === branch.id),
          );
          return {
            calendar_id: calendarEvent.id,
            branch_id: branch.id,
            semester_id: semester.id,
            section: faker.helpers.arrayElement(["A", "B", "C", "D"]),
            batch: faker.helpers.arrayElement([
              "Batch 1",
              "Batch 2",
              "Batch 3",
            ]),
          };
        },
      ),
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
