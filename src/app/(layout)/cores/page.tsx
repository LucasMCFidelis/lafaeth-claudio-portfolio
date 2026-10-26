import { Metadata } from "next";

import getVisibleColorsCached from "@/app/data/colorization/get-visible-colors";
import AnimatedSuspense from "@/components/common/animated-suspense";
import ColorsList from "@/components/common/colors-list";
import GridSkeleton from "@/components/common/grid-skeleton";
import PageTransition from "@/components/common/page-transition";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { colorsQueries } from "@/queries/colors";
import { cacheTags } from "@/queries/tags";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Cores",
  description:
    "Página dos projetos de colorização no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página é destinada aos projetos desenvolvidos pelo autor na área de cores",
};

const ColorsPage = () => {
  return (
    <PageTransition>
      <div className="px-5 flex-1 flex flex-col">
        <AnimatedSuspense fallback={<GridSkeleton />}>
          <PrefetchBoundary
            tags={[cacheTags.colors, cacheTags.images]}
            queries={[
              {
                queryKey: colorsQueries.keys.visible(),
                fetcher: getVisibleColorsCached,
              },
            ]}
          >
            <ColorsList variant="visible" />
          </PrefetchBoundary>
        </AnimatedSuspense>
      </div>
    </PageTransition>
  );
};

export default ColorsPage;
