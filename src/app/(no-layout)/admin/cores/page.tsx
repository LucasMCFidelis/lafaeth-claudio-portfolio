import Link from "next/link";

import getManyColors from "@/app/data/colorization/get-many-colors";
import getVisibleColorsCached from "@/app/data/colorization/get-visible-colors";
import { displayOrder } from "@/app/data/order-by-condition";
import AnimatedSuspense from "@/components/common/animated-suspense";
import ColorsList from "@/components/common/colors-list";
import GridSkeleton from "@/components/common/grid-skeleton";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { Button } from "@/components/ui/button";
import { colorsQueries } from "@/queries/colors";

import AdminOnly from "../components/admin-only";
import SortableColors from "../components/sortable-items/sortable-colors";

const ColorsAdminPage = () => {
  return (
    <>
      <Link href={"/admin/cores/cadastre"}>
        <Button className="absolute top-0 right-0 -translate-x-4 translate-y-4">
          Adicionar Colorização
        </Button>
      </Link>

      <div className="px-5 flex-1 flex flex-col mt-12">
        <AnimatedSuspense fallback={<GridSkeleton />}>
          <AdminOnly>
            <PrefetchBoundary
              queries={[
                {
                  queryKey: colorsQueries.keys.visible(),
                  fetcher: getVisibleColorsCached,
                },
                {
                  queryKey: colorsQueries.keys.list({ orderBy: displayOrder }),
                  fetcher: () =>
                    getManyColors({ orderBy: displayOrder, withImage: true }),
                },
              ]}
            >
              <SortableColors />
              <ColorsList
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

export default ColorsAdminPage;
