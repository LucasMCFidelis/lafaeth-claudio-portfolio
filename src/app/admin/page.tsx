import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { imagesTable } from "@/db/schema";

import verifyUserLogged from "../data/user/verify-user";
import ImageList from "./components/image-list";

const AdminHomePage = async () => {
  const userLogged = await verifyUserLogged();
  if (!userLogged) {
    redirect("/admin/auth");
  }

  const imagesHome = await db.query.imagesTable.findMany({
    where: eq(imagesTable.visibleInHome, true),
  });

  return (
    <>
      <div>Home Page Admin</div>

      <ImageList initialData={imagesHome} />
    </>
  );
};

export default AdminHomePage;
