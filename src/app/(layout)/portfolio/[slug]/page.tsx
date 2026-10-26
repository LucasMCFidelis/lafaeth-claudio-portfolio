import { Metadata } from "next";
import { notFound } from "next/navigation";

import getProjectStaticParams from "@/app/data/project/get-project-static-params";
import getVisibleProjectBySlugCached from "@/app/data/project/get-visible-project-by-slug";
import AnimatedSuspense from "@/components/common/animated-suspense";
import PageTransition from "@/components/common/page-transition";

import ProjectHeader from "./components/project-header";
import ProjectImage from "./components/project-image";
import ProjectImagesColumns from "./components/project-images-columns";
import ProjectNavigation from "./components/project-navigation";
import ProjectSkeleton from "./components/project-skeleton";

type Params = PageProps<"/portfolio/[slug]">["params"];

export const generateStaticParams = getProjectStaticParams;

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await getVisibleProjectBySlugCached(slug);
  if (!page) notFound();

  const { title, description } = page.project;
  return {
    title: `Portfolio Lafaeth Claudio - ${title}`,
    description,
  };
}

const ProjectPage = ({ params }: PageProps<"/portfolio/[slug]">) => {
  return (
    <PageTransition>
      <div className="px-5 flex-1 flex flex-col">
        <AnimatedSuspense fallback={<ProjectSkeleton />}>
          <ProjectContent params={params} />
        </AnimatedSuspense>
      </div>
    </PageTransition>
  );
};

const ProjectContent = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const page = await getVisibleProjectBySlugCached(slug);
  if (!page) notFound();

  const { project, prev, next } = page;
  const galleryHref = `/gallery/portfolio/${project.slug}`;

  return (
    <article className="flex flex-col gap-10 w-11/12 mx-auto">
      <ProjectHeader project={project} />
      {project.cover && (
        <ProjectImage
          image={project.cover}
          galleryHref={galleryHref}
          sizes="92vw"
          priority
          imageClassName="h-svh object-cover"
        />
      )}
      <ProjectImagesColumns
        images={project.images}
        columns={project.imageColumns}
        galleryHref={galleryHref}
      />
      <ProjectNavigation prev={prev} next={next} />
    </article>
  );
};

export default ProjectPage;
