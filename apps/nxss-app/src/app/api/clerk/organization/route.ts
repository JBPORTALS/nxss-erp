import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";

import { db, schema } from "@nxss/db";

export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json();

  if (payload.type === "organization.created") {
    const user = await clerkClient().users.getUser(payload.data.created_by);

    if (!user.id)
      return Response.json({ message: "user not found" }, { status: 400 });

    const org = await db.insert(schema.institutions).values({
      id: payload.data.id,
      created_by: payload.data.created_by,
      name: payload.data.name,
      pattern: "semester",
      semester_count: 6,
    });
  }

  return Response.json({ message: "Organization Synced" });
}

export async function GET() {
  return Response.json({ message: "Hello World!" });
}
