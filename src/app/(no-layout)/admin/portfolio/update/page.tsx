import { Suspense } from "react";

import getOneProjectById from "@/app/data/project/get-one-project-by-id";
import getProjectImages from "@/app/data/project/get-project-images";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { projectsQueries } from "@/queries/projects";

import AdminOnly from "../../components/admin-only";
import ProjectImagesManager from "../components/project-images-manager";
import UpdateProjectForm from "../components/update-project-form";

type SearchParams = Promise<{ projectId: string }>;

const UpdateProjectPage = ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <AdminOnly>
        <UpdateProjectContent searchParams={searchParams} />
      </AdminOnly>
    </Suspense>
  );
};

const UpdateProjectContent = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { projectId } = await searchParams;

  return (
    <PrefetchBoundary
      queries={[
        {
          queryKey: projectsQueries.keys.detail(projectId),
          fetcher: () => getOneProjectById({ projectId }),
        },
        {
          queryKey: projectsQueries.keys.images(projectId),
          fetcher: () => getProjectImages({ projectId }),
        },
      ]}
    >
      {/* Keyed so the form restarts when "Duplicar" opens the copy here. */}
      <div key={projectId} className="flex flex-col gap-10">
        <UpdateProjectForm projectId={projectId} />
        <ProjectImagesManager projectId={projectId} />
      </div>
    </PrefetchBoundary>
  );
};

export default UpdateProjectPage;
