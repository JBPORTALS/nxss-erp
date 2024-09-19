import { NextApiHandler } from "next";
import { getIronSession, SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "myapp_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return async function withSessionRouteWrapper(req: any, res: any) {
    const session = await getIronSession(req, res, sessionOptions);
    req.session = session;
    return handler(req, res);
  };
}

export interface SessionData {
  formData?: {
    step: string;
    data: any;
  };
}

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData extends SessionData {}
}
