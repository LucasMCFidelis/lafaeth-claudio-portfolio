import { Suspense } from "react";

import requireAdmin from "@/app/data/user/require-admin";
import AllImageList from "@/components/common/all-image-list";

const ImagesPage = async () => {
  await requireAdmin();

  return (
    <Suspense>
      <div className="mt-12">
        <AllImageList />
      </div>
    </Suspense>
  );
};

export default ImagesPage;
