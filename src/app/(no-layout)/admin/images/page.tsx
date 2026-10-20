import { Suspense } from "react";

import getManyImages from "@/app/data/image/get-many-images";
import AllImageList from "@/components/common/all-image-list";
import GridSkeleton from "@/components/common/grid-skeleton";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { imagesQueries } from "@/queries/images";

import AdminOnly from "../components/admin-only";

const ImagesPage = () => {
  return (
    <div className="mt-12">
      <Suspense fallback={<GridSkeleton />}>
        <AdminOnly>
          <PrefetchBoundary
            queries={[
              {
                queryKey: imagesQueries.keys.list(),
                fetcher: () => getManyImages({}),
              },
            ]}
          >
            <AllImageList />
          </PrefetchBoundary>
        </AdminOnly>
      </Suspense>
    </div>
  );
};

export default ImagesPage;
