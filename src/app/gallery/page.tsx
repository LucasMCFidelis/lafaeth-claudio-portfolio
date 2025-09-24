import getManyImages from "../data/image/get-many-images";
import GalleryHomeList from "./components/gallery-home-list";

export default async function GalleryPage() {
  const imagesHome = await getManyImages({
    where: { field: "visibleInHome", value: true },
  });

  return (
    <div className="w-full flex-1 flex flex-col sm:grid sm:grid-cols-[1fr_25%] gap-5 md:gap-10 px-5">
      <GalleryHomeList initialData={imagesHome} />
    </div>
  );
}
