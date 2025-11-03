import { Suspense } from "react";

import AllImageList from "@/components/common/all-image-list";

const ImagesPage = () => {
  return (
    <Suspense>
      <div className="mt-12">
        <AllImageList />
      </div>
    </Suspense>
  );
};

export default ImagesPage;
