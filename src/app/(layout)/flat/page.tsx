import { Metadata } from "next";

import getVisibleFlatsCached from "@/app/data/flat/get-visible-flats";
import AnimatedSuspense from "@/components/common/animated-suspense";
import FlatList from "@/components/common/flat-list";
import GridSkeleton from "@/components/common/grid-skeleton";
import PageTransition from "@/components/common/page-transition";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { flatsQueries } from "@/queries/flats";
import { cacheTags } from "@/queries/tags";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Flat",
  description:
    "Página dos projetos de Flat no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página é destinada aos projetos de Flat com suporte a comparação das imagens de flat e line",
};

const FlatPage = () => {
  return (
    <PageTransition>
      <div className="px-5 flex-1 flex flex-col">
        <AnimatedSuspense
          fallback={
            <GridSkeleton className="md:grid-cols-1 lg:grid-cols-1" items={2} />
          }
        >
          <PrefetchBoundary
            tags={[cacheTags.flats, cacheTags.images]}
            queries={[
              {
                queryKey: flatsQueries.keys.visible(),
                fetcher: getVisibleFlatsCached,
              },
            ]}
          >
            <FlatList variant="visible" />
          </PrefetchBoundary>
        </AnimatedSuspense>
      </div>
    </PageTransition>
  );
};

export default FlatPage;
