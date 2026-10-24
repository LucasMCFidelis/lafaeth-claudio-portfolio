import { notFound } from "next/navigation";
import { Suspense } from "react";

import getVisibleProjectBySlugCached from "@/app/data/project/get-visible-project-by-slug";
import getVisibleProjectsCached from "@/app/data/project/get-visible-projects";

import { GalleryBasicType } from "../../components/gallery-list/gallery-basic-type";
import GalleryRootList from "../../components/gallery-list/gallery-root-list";

type Params = PageProps<"/gallery/portfolio/[slug]">["params"];

export async function generateStaticParams() {
  const projects = await getVisibleProjectsCached();
  return projects.map(({ slug }) => ({ slug }));
}

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
