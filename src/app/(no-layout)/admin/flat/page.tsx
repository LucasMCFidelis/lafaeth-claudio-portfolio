import Link from "next/link";
import { Suspense } from "react";

import getManyFlats from "@/app/data/flat/get-many-flats";
import { displayOrder, OrderByCondition } from "@/app/data/order-by-condition";
import requireAdmin from "@/app/data/user/require-admin";
import FlatList from "@/components/common/flat-list";
import { Button } from "@/components/ui/button";
import { flatTable } from "@/db/schema";

import SortableFlats from "../components/sortable-items/sortable-flats";

const FlatsPage = async () => {
  await requireAdmin();

  const orderBy: OrderByCondition<typeof flatTable> = {
    field: "visibleInFlat",
    type: "desc",
  };
  const [visibleFlats, allFlats] = await Promise.all([
    getManyFlats({
      where: { field: "visibleInFlat", value: true },
      orderBy: displayOrder,
      withImages: true,
    }),
    getManyFlats({ orderBy, withImages: true }),
  ]);

  return (
    <Suspense>
      <Link href={"/admin/flat/cadastre"}>
        <Button className="absolute top-0 right-0 -translate-x-4 translate-y-4">
          Adicionar Flat
        </Button>
      </Link>

      <div className="flex-1 max-w-full grid md:grid-cols-[20%_1fr] gap-6 mt-12">
        <SortableFlats initialData={visibleFlats} />
        <FlatList
          variant="all"
          orderBy={orderBy}
          initialData={allFlats}
          maxSizeItemsMd={true}
          displayButtonOpenModal={true}
        />
      </div>
    </Suspense>
  );
};

export default FlatsPage;
