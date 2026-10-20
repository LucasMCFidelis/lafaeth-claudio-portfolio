import getManyImages from "../../data/image/get-many-images";
import { displayOrder } from "../../data/order-by-condition";
import GalleryHomeList from "./components/gallery-list/gallery-home-list";

export default async function GalleryPage() {
  const imagesHome = await getManyImages({
    where: { field: "visibleInHome", value: true },
    orderBy: displayOrder,
  });

  return <GalleryHomeList initialData={imagesHome} />;
}
