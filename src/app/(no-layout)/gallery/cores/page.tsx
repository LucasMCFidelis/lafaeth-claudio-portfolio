import getManyColors from "@/app/data/colorization/get-many-colors";
import { displayOrder } from "@/app/data/order-by-condition";

import GalleryRootList from "../components/gallery-list/gallery-root-list";

export default async function GalleryColorsPage() {
  const colors = await getManyColors({
    where: { field: "visibleInColorization", value: true },
    orderBy: displayOrder,
    withImage: true,
  });

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
