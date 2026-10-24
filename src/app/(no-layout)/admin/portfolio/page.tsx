import Link from "next/link";

import { displayOrder } from "@/app/data/order-by-condition";
import getManyProjects from "@/app/data/project/get-many-projects";
import getVisibleProjectsCached from "@/app/data/project/get-visible-projects";
import { mapToProjectSummary } from "@/app/data/project/map-to-project";
import AnimatedSuspense from "@/components/common/animated-suspense";
import GridSkeleton from "@/components/common/grid-skeleton";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import ProjectsList from "@/components/common/projects-list";
import { Button } from "@/components/ui/button";
import { projectsQueries } from "@/queries/projects";

import AdminOnly from "../components/admin-only";
import SortableProjects from "../components/sortable-items/sortable-projects";

const PortfolioAdminPage = () => {
  return (
    <>
      <Link href={"/admin/portfolio/cadastre"}>
        <Button className="absolute top-0 right-0 -translate-x-4 translate-y-4">
          Adicionar Projeto
        </Button>
      </Link>

      <div className="px-5 flex-1 flex flex-col mt-12">
        <AnimatedSuspense
          fallback={<GridSkeleton itemClassName="aspect-square rounded-none" />}
        >
          <AdminOnly>
            <PrefetchBoundary
              queries={[
                {
                  queryKey: projectsQueries.keys.visible(),
                  fetcher: getVisibleProjectsCached,
                },
                {
                  queryKey: projectsQueries.keys.list({
                    orderBy: displayOrder,
                  }),
                  fetcher: async () =>
                    (await getManyProjects({ orderBy: displayOrder })).map(
                      mapToProjectSummary
                    ),
                },
              ]}
            >
              <SortableProjects />
              <ProjectsList
                variant="all"
                orderBy={displayOrder}
                displayButtonOpenModal
              />
            </PrefetchBoundary>
          </AdminOnly>
        </AnimatedSuspense>
      </div>
    </>
  );
};

export default PortfolioAdminPage;
