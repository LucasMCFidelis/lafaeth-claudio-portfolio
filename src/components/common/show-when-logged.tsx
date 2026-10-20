import verifyUserLogged from "@/app/data/user/verify-user";

/**
 * Renders its children only when the admin is logged in. Reads the session,
 * so wrap it in <Suspense fallback={null}>: the rest of the page stays
 * prerendered and only this part waits for the request.
 */
const ShowWhenLogged = async ({ children }: { children: React.ReactNode }) => {
  const userLogged = await verifyUserLogged();
  return userLogged ? <>{children}</> : null;
};

export default ShowWhenLogged;
