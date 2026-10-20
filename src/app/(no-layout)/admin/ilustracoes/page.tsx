import Link from "next/link";
import { Suspense } from "react";

import getManyIllustrations from "@/app/data/illustrations/get-many-illustration";
import { displayOrder } from "@/app/data/order-by-condition";
import requireAdmin from "@/app/data/user/require-admin";
import IllustrationsList from "@/components/common/illustrations-list";
import { Button } from "@/components/ui/button";

import SortableIllustrations from "../components/sortable-items/sortable-illustrations";

const IllustrationsAdminPage = async () => {
  await requireAdmin();

  const illustrations = await getManyIllustrations({
    orderBy: displayOrder,
    withImage: true,
  });

  return (
    <>
      <Link href={"/admin/ilustracoes/cadastre"}>
        <Button className="absolute top-0 right-0 -translate-x-4 translate-y-4">
          Adicionar Ilustração
        </Button>
      </Link>

      <div className="px-5 flex-1 flex flex-col mt-12">
        <Suspense fallback={<>...</>}>
          <SortableIllustrations
            initialData={illustrations.filter(
              (illustration) => illustration.visibleInIllustrations
            )}
          />
        </Suspense>
        <IllustrationsList
          variant="all"
          orderBy={displayOrder}
          displayButtonOpenModal
          initialData={illustrations}
        />
      </div>
    </>
  );
};

export default IllustrationsAdminPage;
