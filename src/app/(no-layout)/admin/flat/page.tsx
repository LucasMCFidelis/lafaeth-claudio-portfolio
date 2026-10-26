import Link from "next/link";

import getManyFlats from "@/app/data/flat/get-many-flats";
import getVisibleFlatsCached from "@/app/data/flat/get-visible-flats";
import { OrderByCondition } from "@/app/data/order-by-condition";
import AnimatedSuspense from "@/components/common/animated-suspense";
import FlatList from "@/components/common/flat-list";
import GridSkeleton from "@/components/common/grid-skeleton";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { Button } from "@/components/ui/button";
import { flatTable } from "@/db/schema";
import { flatsQueries } from "@/queries/flats";

import AdminOnly from "../components/admin-only";
import SortableFlats from "../components/sortable-items/sortable-flats";

const orderBy: OrderByCondition<typeof flatTable> = {
  field: "visibleInFlat",
  type: "desc",
};

const FlatsPage = () => {
  return (
    <>
      <Link href={"/admin/flat/cadastre"}>
        <Button className="absolute top-0 right-0 -translate-x-4 translate-y-4">
          Adicionar Flat
        </Button>
      </Link>

      <div className="flex-1 max-w-full grid md:grid-cols-[20%_1fr] gap-6 mt-12">
        <AnimatedSuspense fallback={<GridSkeleton className="col-span-full" />}>
          <AdminOnly>
            <PrefetchBoundary
              queries={[
                {
                  queryKey: flatsQueries.keys.visible(),
                  fetcher: getVisibleFlatsCached,
                },
                {
                  queryKey: flatsQueries.keys.list({ orderBy }),
                  fetcher: () => getManyFlats({ orderBy, withImages: true }),
                },
              ]}
            >
              <SortableFlats />
              <FlatList
                variant="all"
                orderBy={orderBy}
                maxSizeItemsMd={true}
                displayButtonOpenModal={true}
              />
            </PrefetchBoundary>
          </AdminOnly>
        </AnimatedSuspense>
      </div>
    </>
  );
};

export default FlatsPage;
