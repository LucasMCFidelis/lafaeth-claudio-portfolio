import Link from "next/link";
import { Suspense } from "react";

import getManyColors from "@/app/data/colorization/get-many-colors";
import ColorsList from "@/components/common/colors-list";
import { Button } from "@/components/ui/button";

import SortableColors from "../components/sortable-items/sortable-colors";

const ColorsAdminPage = async () => {
  const colors = await getManyColors({
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
          displayButtonOpenModal
          initialData={colors}
          withImage={true}
        />
      </div>
    </>
  );
};

export default ColorsAdminPage;
