import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { auth } from "@/lib/auth";

const verifyUserLogged = cache(async (): Promise<boolean> => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return false;
  }

  return true;
});

export default verifyUserLogged;
