import { redirect } from "next/navigation";

import { getHomeImages } from "@/actions/get-home-images";

import verifyUserLogged from "../../data/user/verify-user";
import SortableImagesHome from "./components/sortable-items/sortable-images-home";

const AdminHomePage = async () => {
  const userLogged = await verifyUserLogged();
  if (!userLogged) {
    redirect("/admin/auth");
  }

  const imagesHome = await getHomeImages();

  return (
    <div className="flex flex-col flex-1 w-full gap-6 mt-12">
      <SortableImagesHome initialData={imagesHome} />
    </div>
  );
};

export default AdminHomePage;
