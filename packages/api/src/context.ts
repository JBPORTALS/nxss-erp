import { getAuth } from "@clerk/nextjs/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

import { db } from "@nxss/db";

/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createContextInner = async ({
  auth,
}: {
  auth: ReturnType<typeof getAuth>;
}) => {
  return {
    auth,
    db,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: Omit<CreateNextContextOptions, "info">,
) => {
  return await createContextInner({ auth: getAuth(opts.req) });
};

export type Context = Awaited<ReturnType<typeof createContext>>;
