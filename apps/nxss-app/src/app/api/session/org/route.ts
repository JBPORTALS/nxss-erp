import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";

import { SessionData, sessionOptions } from "~/utils/lib/session";

export async function GET(request: NextRequest) {
  const response = new Response();
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions,
  );

  return NextResponse.json({
    formData: session.formData || { step: "", data: {} },
  });
}

export async function DELETE(request: NextRequest) {
  const response = new Response();
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions,
  );
  session.destroy();
  return response;
}

export async function POST(request: NextRequest) {
  const response = new Response();
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions,
  );

  const { step, data } = await request.json();
  session.formData = { step, data };
  await session.save();

  return response;
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204 });
}
