import { redirect } from "next/navigation";

import verifyUser from "../data/user/verify-user";

const AdminHomePage = async () => {
  const userLogged = await verifyUser();
  if (!userLogged) {
    redirect("/admin/auth");
  }

  return <div>Home Page Admin</div>;
};

export default AdminHomePage;
