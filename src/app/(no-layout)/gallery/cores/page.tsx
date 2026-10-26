import getVisibleColorsCached from "@/app/data/colorization/get-visible-colors";

import GalleryRootList from "../components/gallery-list/gallery-root-list";

export default async function GalleryColorsPage() {
  const colors = await getVisibleColorsCached();

  const itemsList = colors
    .filter((color) => color.image !== null)
    .map((color) => {
      return {
        ...color.image!,
        productionYear: color.productionYear,
        observations: color.observations,
      };
    });

  if (itemsList.length === 0) return <p>Lista de itens vazia</p>;

  return <GalleryRootList itemsList={itemsList} hrefBackToClose="/cores" />;
}
