import { Metadata } from "next";

import getVisibleComicsCached from "@/app/data/comics/get-visible-comics";
import AnimatedSuspense from "@/components/common/animated-suspense";
import ComicsList from "@/components/common/comics-list";
import GridSkeleton from "@/components/common/grid-skeleton";
import PageTransition from "@/components/common/page-transition";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { comicsQueries } from "@/queries/comics";
import { cacheTags } from "@/queries/tags";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Quadrinhos",
  description:
    "Página dos projetos de quadrinhos no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página é destinada aos projetos de quadrinhos desenvolvidos pelo autor",
};

const ComicsPage = () => {
  return (
    <PageTransition>
      <div className="px-5 flex-1 flex flex-col">
        <AnimatedSuspense fallback={<GridSkeleton />}>
          <PrefetchBoundary
            tags={[cacheTags.comics, cacheTags.images]}
            queries={[
              {
                queryKey: comicsQueries.keys.visible(),
                fetcher: getVisibleComicsCached,
              },
            ]}
          >
            <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
              <ComicsList variant="visible" />
            </div>
          </PrefetchBoundary>
        </AnimatedSuspense>
      </div>
    </PageTransition>
  );
};

export default ComicsPage;
