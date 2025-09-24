import getManyImages from "../../data/image/get-many-images";
import GalleryHomeList from "./components/gallery-home-list";

export default async function GalleryPage() {
  const imagesHome = await getManyImages({
    where: { field: "visibleInHome", value: true },
  });

  return <GalleryHomeList initialData={imagesHome} />;
}
