import getManyComics from "@/app/data/comics/get-many-comics";

import GalleryRootList from "../components/gallery-list/gallery-root-list";

export default async function GalleryComicsPage() {
  const comics = await getManyComics({
    where: { field: "visibleInComics", value: true },
    withImage: true,
  });

  const itemsList = comics
    .filter((comic) => comic.image !== null)
    .map((comic) => {
      return {
        ...comic.image!,
        productionYear: comic.productionYear,
        productionSizePages: comic.productionSizePages,
      };
    });

  if (itemsList.length === 0) return <p>Lista de itens vazia</p>;

  return <GalleryRootList itemsList={itemsList} />;
}
