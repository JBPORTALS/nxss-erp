/**@ts-expect-error */
import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@clerk/nextjs/server";

import { createCaller, createContextInner } from "@nxss/api";

const createContext = cache(async () => {
  const headersList = headers();
  const heads = new Headers(headersList);
  heads.set("x-trpc-source", "rsc");

  return await createContextInner({
    auth: auth(),
  });
});

export const api = createCaller(createContext);
