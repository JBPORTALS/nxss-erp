import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";

import { db, schema } from "@nxss/db";

export async function POST(request: Request) {
  const payload: WebhookEvent = await request.json();

  if (payload.type === "organizationInvitation.accepted") {
    console.log("testing...", payload);
    const user = await clerkClient().users.getUserList({
      emailAddress: [payload.data.email_address],
    });
    const user_id = user.data.at(0)?.id;

    if (!user_id)
      return Response.json({ message: "user not found" }, { status: 400 });

    await db.insert(schema.staff).values({
      clerk_org_id: payload.data.organization_id,
      clerk_user_id: user_id,
    });
  }

  return Response.json({ message: "Invitation Accepted" });
}

export async function GET() {
  return Response.json({ message: "Hello World!" });
}
