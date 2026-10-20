import Link from "next/link";
import { Suspense } from "react";

import getManyComics from "@/app/data/comics/get-many-comics";
import getVisibleComicsCached from "@/app/data/comics/get-visible-comics";
import { displayOrder } from "@/app/data/order-by-condition";
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
        <Suspense fallback={<GridSkeleton />}>
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
              <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
                <ComicsList
                  variant="all"
                  orderBy={displayOrder}
                  displayButtonOpenModal
                />
              </div>
            </PrefetchBoundary>
          </AdminOnly>
        </Suspense>
      </div>
    </>
  );
};

export default ComicsAdminPage;
