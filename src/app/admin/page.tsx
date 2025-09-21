import { redirect } from "next/navigation";

import verifyUserLogged from "../data/user/verify-user";

const AdminHomePage = async () => {
  const userLogged = await verifyUserLogged();
  if (!userLogged) {
    redirect("/admin/auth");
  }

  return (
    <>
      <div>Home Page Admin</div>
    </>
  );
};

export default AdminHomePage;
