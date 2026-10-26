import { Metadata } from "next";

import getVisibleIllustrationsCached from "@/app/data/illustrations/get-visible-illustrations";
import AnimatedSuspense from "@/components/common/animated-suspense";
import GridSkeleton from "@/components/common/grid-skeleton";
import IllustrationsList from "@/components/common/illustrations-list";
import PageTransition from "@/components/common/page-transition";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { illustrationsQueries } from "@/queries/illustrations";
import { cacheTags } from "@/queries/tags";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Cores",
  description:
    "Página dos projetos de ilustração no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio.",
};

const IllustrationsPage = () => {
  return (
    <PageTransition>
      <div className="px-5 flex-1 flex flex-col">
        <AnimatedSuspense fallback={<GridSkeleton />}>
          <PrefetchBoundary
            tags={[cacheTags.illustrations, cacheTags.images]}
            queries={[
              {
                queryKey: illustrationsQueries.keys.visible(),
                fetcher: getVisibleIllustrationsCached,
              },
            ]}
          >
            <IllustrationsList variant="visible" />
          </PrefetchBoundary>
        </AnimatedSuspense>
      </div>
    </PageTransition>
  );
};

export default IllustrationsPage;
