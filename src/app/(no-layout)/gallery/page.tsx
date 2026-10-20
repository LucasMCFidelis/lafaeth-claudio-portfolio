import getHomeImagesCached from "@/app/data/image/get-home-images";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { imagesQueries } from "@/queries/images";
import { cacheTags } from "@/queries/tags";

import GalleryHomeList from "./components/gallery-list/gallery-home-list";

export default function GalleryPage() {
  return (
    <PrefetchBoundary
      tags={[cacheTags.images]}
      queries={[
        { queryKey: imagesQueries.keys.home(), fetcher: getHomeImagesCached },
      ]}
    >
      <GalleryHomeList />
    </PrefetchBoundary>
  );
}
