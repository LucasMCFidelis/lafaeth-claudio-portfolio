import { redirect } from "next/navigation";

import getManyImages from "../data/image/get-many-images";
import verifyUserLogged from "../data/user/verify-user";
import ImageList from "./components/image-list";

const AdminHomePage = async () => {
  const userLogged = await verifyUserLogged();
  if (!userLogged) {
    redirect("/admin/auth");
  }

  const imagesHome = await getManyImages({
    where: { field: "visibleInHome", value: true },
  });

  return (
    <>
      <div>Home Page Admin</div>

      <ImageList initialData={imagesHome} />
    </>
  );
};

export default AdminHomePage;
