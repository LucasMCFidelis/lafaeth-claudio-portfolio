import { Metadata } from "next";

import getVisibleProjectsCached from "@/app/data/project/get-visible-projects";
import AnimatedSuspense from "@/components/common/animated-suspense";
import GridSkeleton from "@/components/common/grid-skeleton";
import PageTransition from "@/components/common/page-transition";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import ProjectsList from "@/components/common/projects-list";
import { projectsQueries } from "@/queries/projects";
import { cacheTags } from "@/queries/tags";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Portfólio",
  description:
    "Projetos de design, identidade visual, social media e ilustração desenvolvidos pelo Designer, Ilustrador e Quadrinista Lafaeth Claudio.",
};

const PortfolioPage = () => {
  return (
    <PageTransition>
      <div className="px-5 flex-1 flex flex-col">
        <AnimatedSuspense
          fallback={<GridSkeleton itemClassName="aspect-square rounded-none" />}
        >
          <PrefetchBoundary
            tags={[cacheTags.projects]}
            queries={[
              {
                queryKey: projectsQueries.keys.visible(),
                fetcher: getVisibleProjectsCached,
              },
            ]}
          >
            <ProjectsList variant="visible" />
          </PrefetchBoundary>
        </AnimatedSuspense>
      </div>
    </PageTransition>
  );
};

export default PortfolioPage;
