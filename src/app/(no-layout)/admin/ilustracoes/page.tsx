import Link from "next/link";

import getManyIllustrations from "@/app/data/illustrations/get-many-illustration";
import getVisibleIllustrationsCached from "@/app/data/illustrations/get-visible-illustrations";
import { displayOrder } from "@/app/data/order-by-condition";
import AnimatedSuspense from "@/components/common/animated-suspense";
import GridSkeleton from "@/components/common/grid-skeleton";
import IllustrationsList from "@/components/common/illustrations-list";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { Button } from "@/components/ui/button";
import { illustrationsQueries } from "@/queries/illustrations";

import AdminOnly from "../components/admin-only";
import SortableIllustrations from "../components/sortable-items/sortable-illustrations";

const IllustrationsAdminPage = () => {
  return (
    <>
      <Link href={"/admin/ilustracoes/cadastre"}>
        <Button className="absolute top-0 right-0 -translate-x-4 translate-y-4">
          Adicionar Ilustração
        </Button>
      </Link>

      <div className="px-5 flex-1 flex flex-col mt-12">
        <AnimatedSuspense fallback={<GridSkeleton />}>
          <AdminOnly>
            <PrefetchBoundary
              queries={[
                {
                  queryKey: illustrationsQueries.keys.visible(),
                  fetcher: getVisibleIllustrationsCached,
                },
                {
                  queryKey: illustrationsQueries.keys.list({
                    orderBy: displayOrder,
                  }),
                  fetcher: () =>
                    getManyIllustrations({
                      orderBy: displayOrder,
                      withImage: true,
                    }),
                },
              ]}
            >
              <SortableIllustrations />
              <IllustrationsList
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

export default IllustrationsAdminPage;
