import Link from "next/link";
import { Suspense } from "react";

import getManyColors from "@/app/data/colorization/get-many-colors";
import { displayOrder } from "@/app/data/order-by-condition";
import requireAdmin from "@/app/data/user/require-admin";
import ColorsList from "@/components/common/colors-list";
import { Button } from "@/components/ui/button";

import SortableColors from "../components/sortable-items/sortable-colors";

const ColorsAdminPage = async () => {
  await requireAdmin();

  const colors = await getManyColors({
    orderBy: displayOrder,
    withImage: true,
  });

  return (
    <>
      <Link href={"/admin/cores/cadastre"}>
        <Button className="absolute top-0 right-0 -translate-x-4 translate-y-4">
          Adicionar Colorização
        </Button>
      </Link>

      <div className="px-5 flex-1 flex flex-col mt-12">
        <Suspense fallback={<>...</>}>
          <SortableColors
            initialData={colors.filter((color) => color.visibleInColors)}
          />
        </Suspense>
        <ColorsList
          variant="all"
          orderBy={displayOrder}
          displayButtonOpenModal
          initialData={colors}
        />
      </div>
    </>
  );
};

export default ColorsAdminPage;
