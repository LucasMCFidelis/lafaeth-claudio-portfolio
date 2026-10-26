import getHomeImagesCached from "@/app/data/image/get-home-images";
import AnimatedSuspense from "@/components/common/animated-suspense";
import GridSkeleton from "@/components/common/grid-skeleton";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { imagesQueries } from "@/queries/images";

import AdminOnly from "./components/admin-only";
import SortableImagesHome from "./components/sortable-items/sortable-images-home";

const AdminHomePage = () => {
  return (
    <div className="flex flex-col flex-1 w-full gap-6 mt-12">
      <AnimatedSuspense fallback={<GridSkeleton />}>
        <AdminOnly>
          <PrefetchBoundary
            queries={[
              {
                queryKey: imagesQueries.keys.home(),
                fetcher: getHomeImagesCached,
              },
            ]}
          >
            <SortableImagesHome />
          </PrefetchBoundary>
        </AdminOnly>
      </AnimatedSuspense>
    </div>
  );
};

export default AdminHomePage;
