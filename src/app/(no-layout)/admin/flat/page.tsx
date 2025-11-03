import Link from "next/link";
import { Suspense } from "react";

import { getFlatsVisible } from "@/actions/get-flats-visible";
import { getFlats } from "@/actions/get-many-flats";
import { OrderByCondition } from "@/app/data/order-by-condition";
import FlatList from "@/components/common/flat-list";
import { Button } from "@/components/ui/button";
import { flatTable } from "@/db/schema";

import SortableFlats from "../components/sortable-items/sortable-flats";

const FlatsPage = async () => {
  const orderBy: OrderByCondition<typeof flatTable> = {
    field: "visibleInFlat",
    type: "desc",
  };
  const [flats, allFlats] = await Promise.all([
    getFlatsVisible(),
    getFlats({ orderBy }),
  ]);

  return (
    <Suspense>
      <Link href={"/admin/flat/cadastre"}>
        <Button className="absolute top-0 right-0 -translate-x-4 translate-y-4">
          Adicionar Flat
        </Button>
      </Link>

      <div className="flex-1 max-w-full grid md:grid-cols-[20%_1fr] gap-6 mt-12">
        <SortableFlats initialData={flats} />
        <FlatList
          initialData={allFlats}
          maxSizeItemsMd={true}
          displayButtonOpenModal={true}
          orderBy={orderBy}
        />
      </div>
    </Suspense>
  );
};

export default FlatsPage;
