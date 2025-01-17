// import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";

// import { db, eq, schema } from "@nxss/db";

// export async function POST(request: Request) {
//   const payload: WebhookEvent = await request.json();

//   if (payload.type === "organization.created") {
//     const user = await clerkClient().users.getUser(payload.data.created_by);

//     if (!user.id)
//       return Response.json({ message: "user not found" }, { status: 400 });

//     if (!payload.data.public_metadata)
//       throw new Error("puclic_metadata not present");

//     await db.insert(schema.institutions).values({
//       id: payload.data.id,
//       created_by: payload.data.created_by,
//       name: payload.data.name,
//       pattern: payload.data.public_metadata
//         ?.pattern as typeof schema.institutions.$inferInsert.pattern,
//       semester_count: payload.data.public_metadata
//         .semester_count as typeof schema.institutions.$inferInsert.semester_count,
//     });
//   }

//   if (payload.type === "organization.deleted") {
//     if (!payload.data.id)
//       return Response.json(
//         { message: "Organization Id not found" },
//         { status: 400 },
//       );

//     await db
//       .delete(schema.institutions)
//       .where(eq(schema.institutions.id, payload.data.id));
//   }

//   return Response.json({ message: "Organization Synced" });
// }
// export async function GET() {
//   return Response.json({ message: "Hello World!" });
// }
