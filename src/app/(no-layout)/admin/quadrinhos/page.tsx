import Link from "next/link";

import getManyComics from "@/app/data/comics/get-many-comics";
import getVisibleComicsCached from "@/app/data/comics/get-visible-comics";
import { displayOrder } from "@/app/data/order-by-condition";
import AnimatedSuspense from "@/components/common/animated-suspense";
import ComicsList from "@/components/common/comics-list";
import GridSkeleton from "@/components/common/grid-skeleton";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { Button } from "@/components/ui/button";
import { comicsQueries } from "@/queries/comics";

import AdminOnly from "../components/admin-only";
import SortableComics from "../components/sortable-items/sortable-comics";

const ComicsAdminPage = () => {
  return (
    <>
      <Link href={"/admin/quadrinhos/cadastre"}>
        <Button className="absolute top-0 right-0 -translate-x-4 translate-y-4">
          Adicionar Quadrinho
        </Button>
      </Link>

      <div className="px-5 flex-1 flex flex-col mt-12">
        <AnimatedSuspense fallback={<GridSkeleton />}>
          <AdminOnly>
            <PrefetchBoundary
              queries={[
                {
                  queryKey: comicsQueries.keys.visible(),
                  fetcher: getVisibleComicsCached,
                },
                {
                  queryKey: comicsQueries.keys.list({ orderBy: displayOrder }),
                  fetcher: () =>
                    getManyComics({ orderBy: displayOrder, withImage: true }),
                },
              ]}
            >
              <SortableComics />
              <ComicsList
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

export default ComicsAdminPage;
