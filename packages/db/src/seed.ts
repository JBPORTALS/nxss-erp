// import { clerkClient } from "@clerk/clerk-sdk-node";
// import { faker } from "@faker-js/faker";
// import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { PgTable } from "drizzle-orm/pg-core";
// import pg from "pg";

// import {
//   academicYears,
//   batches,
//   branches,
//   calendar,
//   calendarBranches,
//   institutions,
//   sections,
//   semesters,
//   staff,
//   students,
// } from "./schema/index";

// const { Pool } = pg;

// if (!process.env.SEED_MODE)
//   throw new Error("Not in a SEED MODE, set a SEED_MODE env variable ❌");

// if (!process.env.DATABASE_URL)
//   throw new Error("set a DATABASE_URL env variable ❌");

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// const db = drizzle(pool);

// async function reset(tableName: string) {
//   const query = sql`TRUNCATE TABLE ${sql.identifier(tableName)} RESTART IDENTITY CASCADE`;
//   return db.execute(query);
// }

// async function insertInBatches<T extends PgTable<any>>(
//   table: T,
//   values: InferInsertModel<T>[],
//   batchSize = 1000,
// ): Promise<InferSelectModel<T>[]> {
//   let allInserted: InferSelectModel<T>[] = [];
//   for (let i = 0; i < values.length; i += batchSize) {
//     const batch = values.slice(i, i + batchSize);
//     try {
//       const inserted = await db.insert(table).values(batch).returning();
//       allInserted = allInserted.concat(inserted);
//     } catch (error) {
//       console.error(`Error inserting batch into ${table}:`, error);
//       throw error;
//     }
//   }
//   return allInserted;
// }

// async function resetAllTables() {
//   // Reset tables in reverse order of their dependencies
//   const tableNames = [
//     "nxss_calendar_branches",
//     "nxss_calendar",
//     "nxss_batches",
//     "nxss_sections",
//     "nxss_semesters",
//     "nxss_staff",
//     "nxss_students",
//     "nxss_branches",
//     "nxss_academic_years",
//     "nxss_institutions",
//   ];

//   for (const tableName of tableNames) {
//     try {
//       await reset(tableName);
//       console.log(`Reset ${tableName} successfully`);
//     } catch (error) {
//       console.error(`Error resetting ${tableName}:`, error);
//       throw error;
//     }
//   }
// }

// async function main() {
//   console.log("Resetting tables 🧹");
//   await resetAllTables();

//   console.log("Fetching and seeding institutions from Clerk 🏫");
//   let insertedInstitutions;
//   try {
//     const organizations = await clerkClient.organizations.getOrganizationList();

//     // console.log(organizations);

//     const institutionsData = organizations.data.map((org) => ({
//       id: org.id,
//       name: org.name,
//       pattern: org.publicMetadata
//         ?.pattern as typeof institutions.$inferInsert.pattern,
//       semester_count: parseInt(org.publicMetadata?.semester_count as string),
//       created_by: org.createdBy,
//       created_at: new Date(org.createdAt),
//       updated_at: org.updatedAt ? new Date(org.updatedAt) : undefined,
//     }));

//     insertedInstitutions = await insertInBatches(
//       institutions,
//       institutionsData,
//     );
//     console.log(
//       `Successfully seeded ${insertedInstitutions.length} institutions from Clerk data`,
//     );
//   } catch (error) {
//     console.error("Error fetching and seeding institutions from Clerk:", error);
//     throw error;
//   }

//   console.log("Seeding academic years 📅");
//   const academicYearsData = insertedInstitutions.map(
//     (institution: typeof institutions.$inferSelect) => ({
//       institution_id: institution.id,
//       year: "2024",
//       pattern: institution.pattern,
//       semester_count: institution.semester_count,
//       status: faker.helpers.arrayElement<
//         typeof academicYears.$inferInsert.status
//       >(["current", "completed", "upcoming"]),
//       start_date: new Date(Date.now()),
//       end_date: faker.date.future({ years: 1 }),
//     }),
//   );

//   const insertedAcademicYears = await insertInBatches(
//     academicYears,
//     academicYearsData,
//   );

//   console.log("Seeding branches 🌿");
//   const branchesData = insertedInstitutions.flatMap(
//     (institution: typeof institutions.$inferSelect) =>
//       Array.from<unknown, typeof branches.$inferInsert>({ length: 5 }, () => ({
//         name: faker.word.noun(),
//         institution_id: institution.id,
//         description: faker.helpers.arrayElement([
//           undefined,
//           faker.commerce.productDescription(),
//         ]),
//       })),
//   );

//   const insertedBranches = await insertInBatches(branches, branchesData);

//   console.log("Seeding semesters 🗓️");
//   const semestersData = insertedAcademicYears.flatMap(
//     (academicYear: typeof academicYears.$inferSelect) =>
//       insertedBranches
//         .filter(
//           (branch) => branch.institution_id === academicYear.institution_id,
//         )
//         .flatMap((branch) =>
//           Array.from<unknown, typeof semesters.$inferInsert>(
//             {
//               length:
//                 insertedInstitutions
//                   .filter(
//                     (institution) =>
//                       institution.id === academicYear.institution_id,
//                   )
//                   .at(0)?.semester_count ?? 0,
//             },
//             (_, i) => ({
//               academic_year_id: academicYear.id,
//               branch_id: branch.id,
//               number: i + 1,
//               status: (i + 1) % 2 === 0 ? "upcoming" : "current",
//             }),
//           ),
//         ),
//   );
//   const insertedSemesters = await insertInBatches(semesters, semestersData);

//   console.log("Seeding sections 📚");
//   const sectionsData = insertedSemesters.flatMap(
//     (semester: typeof semesters.$inferSelect) =>
//       Array.from<unknown, typeof sections.$inferInsert>({ length: 3 }, () => ({
//         name: faker.helpers.arrayElement(["A", "B", "C", "D"]),
//         branch_id: semester.branch_id,
//         semester_id: semester.id,
//       })),
//   );
//   const insertedSections = await insertInBatches(sections, sectionsData);

//   console.log("Seeding batches 👥");
//   const batchesData = insertedSections.flatMap(
//     (section: typeof sections.$inferSelect) =>
//       Array.from<unknown, typeof batches.$inferInsert>({ length: 2 }, () => ({
//         name: faker.helpers.arrayElement(["Batch 1", "Batch 2", "Batch 3"]),
//         section_id: section.id,
//       })),
//   );
//   const insertedBatches = await insertInBatches(batches, batchesData);

//   console.log("Seeding students 🎓");
//   const studentsData = Array.from<unknown, typeof students.$inferInsert>(
//     { length: 500 },
//     () => {
//       const dateOfBirth = faker.date.between({
//         from: new Date(2001, 0, 1),
//         to: new Date(2005, 11, 31),
//       });
//       const yearOfBirth = dateOfBirth.getFullYear();
//       const yearOfJoin = faker.number.int({ min: yearOfBirth + 16, max: 2024 });

//       const randomBranch = faker.helpers.arrayElement(insertedBranches);
//       const randomSemester = faker.helpers.arrayElement(
//         insertedSemesters.filter((s) => s.branch_id === randomBranch.id),
//       );

//       return {
//         full_name: faker.person.fullName(),
//         email: faker.internet.email({ lastName: "+clerk_test" }),
//         phone_number: faker.helpers.fromRegExp("+1[0-9]{3}55501[0-9][0-9]"),
//         date_of_birth: dateOfBirth.toISOString().split("T")[0],
//         year_of_join: yearOfJoin,
//         clerk_user_id: null,
//         clerk_org_id: faker.helpers.arrayElement(insertedInstitutions).id,
//         branch_id: randomBranch.id,
//         current_semester_id: randomSemester.id,
//         created_at: faker.date.past(),
//         updated_at: faker.date.recent(),
//       };
//     },
//   );
//   await insertInBatches(students, studentsData);

//   console.log("Seeding staff 👨‍🏫");
//   const staffData = Array.from<unknown, typeof staff.$inferInsert>(
//     { length: 100 },
//     () => ({
//       full_name: faker.person.fullName(),
//       email: faker.internet.email({ lastName: "+clerk_test" }),
//       phone_number: faker.helpers.fromRegExp("+1[0-9]{3}55501[0-9][0-9]"),
//       clerk_user_id: null,
//       clerk_org_id: faker.helpers.arrayElement(insertedInstitutions).id,
//       created_at: faker.date.past(),
//       updated_at: faker.date.recent(),
//     }),
//   );
//   await insertInBatches(staff, staffData);

//   console.log("Seeding calendar events 📅");
//   const calendarData = Array.from<unknown, typeof calendar.$inferInsert>(
//     { length: 50 },
//     () => ({
//       title: faker.lorem.sentence(),
//       description: faker.lorem.paragraph(),
//       event_type: faker.helpers.arrayElement([
//         "event",
//         "opportunity",
//         "holiday",
//         "exam_schedule",
//       ]),
//       audience_type: faker.helpers.arrayElement(["staff", "students", "all"]),
//       is_all_day: faker.datatype.boolean(),
//       start_date: faker.date.future(),
//       end_date: faker.date.future(),
//       location: faker.location.streetAddress(),
//       attachment_url: faker.internet.url(),
//       created_at: faker.date.past(),
//       updated_at: faker.date.recent(),
//     }),
//   );
//   const insertedCalendarEvents = await insertInBatches(calendar, calendarData);

//   console.log("Seeding calendar branches 🌿📅");
//   const calendarBranchesData = insertedCalendarEvents.flatMap(
//     (calendarEvent: typeof calendar.$inferSelect) =>
//       Array.from<unknown, typeof calendarBranches.$inferInsert>(
//         { length: faker.number.int({ min: 1, max: 5 }) },
//         () => {
//           const branch = faker.helpers.arrayElement(insertedBranches);
//           const semester = faker.helpers.arrayElement(
//             insertedSemesters.filter((s) => s.branch_id === branch.id),
//           );
//           const section = faker.helpers.arrayElement(
//             insertedSections.filter((s) => s.semester_id === semester.id),
//           );
//           const batch = faker.helpers.arrayElement(
//             insertedBatches.filter((b) => b.section_id === section.id),
//           );
//           return {
//             calendar_id: calendarEvent.id,
//             branch_id: branch.id,
//             semester_id: semester.id,
//             section: section.id,
//             batch: batch.id,
//           };
//         },
//       ),
//   );
//   await insertInBatches(calendarBranches, calendarBranchesData);

//   console.log("Seeding completed successfully ✅");
// }

// main()
//   .then(() => console.log("Seed script finished"))
//   .catch((e) => {
//     console.error("Error in seed script:", e);
//   })
//   .finally(() => process.exit(0));
