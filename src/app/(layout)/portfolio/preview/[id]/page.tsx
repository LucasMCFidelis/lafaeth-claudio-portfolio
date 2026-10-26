import { Metadata } from "next";
import { notFound } from "next/navigation";
import z from "zod";

import AdminOnly from "@/app/(no-layout)/admin/components/admin-only";
import getProjectPreview from "@/app/data/project/get-project-preview";
import AnimatedSuspense from "@/components/common/animated-suspense";
import PageTransition from "@/components/common/page-transition";

import ProjectArticle from "../../[slug]/components/project-article";
import ProjectSkeleton from "../../[slug]/components/project-skeleton";
import PreviewBar from "./components/preview-bar";

type Params = PageProps<"/portfolio/preview/[id]">["params"];

export const metadata: Metadata = {
  title: "Prévia do projeto - Portfolio Lafaeth Claudio",
  robots: { index: false, follow: false },
};

/**
 * Admin preview of any project (drafts included), with the same layout as
 * the public page. Images do not open the gallery, which only reads
 * published projects.
 */
const ProjectPreviewPage = ({ params }: PageProps<"/portfolio/preview/[id]">) => {
  return (
    <PageTransition>
      <div className="px-5 flex-1 flex flex-col">
        <AnimatedSuspense fallback={<ProjectSkeleton />}>
          <AdminOnly>
            <ProjectPreviewContent params={params} />
          </AdminOnly>
        </AnimatedSuspense>
      </div>
    </PageTransition>
  );
};

const ProjectPreviewContent = async ({ params }: { params: Params }) => {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();

  const project = await getProjectPreview(id);
  if (!project) notFound();

  return (
    <ProjectArticle project={project}>
      <PreviewBar
        projectId={project.id}
        slug={project.slug}
        published={project.visibleInProjects}
      />
    </ProjectArticle>
  );
};

export default ProjectPreviewPage;
