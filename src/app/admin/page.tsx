import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

const AdminHomePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/admin/auth");
  }

  return <div>Home Page Admin</div>;
};

export default AdminHomePage;
