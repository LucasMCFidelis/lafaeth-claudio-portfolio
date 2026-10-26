import "server-only";

import { redirect } from "next/navigation";

import verifyUserLogged from "./verify-user";

/** Sends visitors without a valid session to the login page. */
const requireAdmin = async () => {
  const userLogged = await verifyUserLogged();
  if (!userLogged) redirect("/admin/auth");
};

export default requireAdmin;
