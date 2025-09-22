import { redirect } from "next/navigation";

import getHomeImages from "../data/image/get-home-images";
import verifyUserLogged from "../data/user/verify-user";
import ImageList from "./components/image-list";

const AdminHomePage = async () => {
  const userLogged = await verifyUserLogged();
  if (!userLogged) {
    redirect("/admin/auth");
  }

  const imagesHome = await getHomeImages();

  return (
    <>
      <div>Home Page Admin</div>

      <ImageList initialData={imagesHome} />
    </>
  );
};

export default AdminHomePage;
