import { notFound } from "next/navigation";
import { Suspense } from "react";

import getProjectStaticParams from "@/app/data/project/get-project-static-params";
import getVisibleProjectBySlugCached from "@/app/data/project/get-visible-project-by-slug";

import { GalleryBasicType } from "../../components/gallery-list/gallery-basic-type";
import GalleryRootList from "../../components/gallery-list/gallery-root-list";

type Params = PageProps<"/gallery/portfolio/[slug]">["params"];

export const generateStaticParams = getProjectStaticParams;

export default function GalleryProjectPage({
  params,
}: PageProps<"/gallery/portfolio/[slug]">) {
  return (
    <Suspense fallback={<p>Carregando galeria...</p>}>
      <GalleryProject params={params} />
    </Suspense>
  );
}

const GalleryProject = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const page = await getVisibleProjectBySlugCached(slug);
  if (!page) notFound();

  const { cover, images } = page.project;
  const itemsList: GalleryBasicType[] = cover ? [cover, ...images] : images;

  if (itemsList.length === 0) return <p>Lista de itens vazia</p>;

  return (
    <GalleryRootList
      itemsList={itemsList}
      hrefBackToClose={`/portfolio/${slug}`}
    />
  );
};
