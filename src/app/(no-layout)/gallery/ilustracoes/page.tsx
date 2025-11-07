import getManyIllustrations from "@/app/data/illustrations/get-many-illustration";

import { GalleryBasicType } from "../components/gallery-list/gallery-basic-type";
import GalleryRootList from "../components/gallery-list/gallery-root-list";

export default async function GalleryIllustrationPage() {
  const illustrations = await getManyIllustrations({
    where: { field: "visibleInIllustrations", value: true },
    withImage: true,
  });

  const itemsList: Array<GalleryBasicType> = illustrations
    .filter((illustration) => illustration.image !== null)
    .map((illustration) => {
      return {
        id: illustration.image!.id,
        title: illustration.image!.title,
        description: illustration.description ?? "",
        imageUrl: illustration.image!.imageUrl,
        ...(illustration.redirectUrl && {
          redirectUrl: illustration.redirectUrl,
        }),
      };
    });

  if (itemsList.length === 0) return <p>Lista de itens vazia</p>;

  return (
    <GalleryRootList itemsList={itemsList} hrefBackToClose="/ilustracoes" />
  );
}
