import "server-only";

import { headers } from "next/headers";
import { connection } from "next/server";
import { cache } from "react";

import { auth } from "@/lib/auth";

const verifyUserLogged = cache(async (): Promise<boolean> => {
  // With partial prefetching, Next prerenders routes using the request's
  // cookies. Validating a session reads the clock (new Date()) and crypto,
  // which is not allowed while prerendering, so only run it per request.
  await connection();

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return false;
  }

  return true;
});

export default verifyUserLogged;
