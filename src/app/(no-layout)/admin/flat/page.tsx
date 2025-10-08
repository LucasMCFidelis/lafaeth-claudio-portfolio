import Link from "next/link";

import { getFlatsVisible } from "@/actions/get-flats-visible";
import FlatList from "@/components/common/flat-list";
import { Button } from "@/components/ui/button";

import SortableFlats from "../components/sortable-items/sortable-flats";

const FlatsPage = async () => {
  const flats = await getFlatsVisible();

  return (
    <>
      <Link href={"/admin/flat/cadastre"}>
        <Button className="absolute top-0 right-0 -translate-x-4 translate-y-4">
          Adicionar Flat
        </Button>
      </Link>

      <div className="flex-1 max-w-full grid md:grid-cols-[20%_1fr] gap-6 mt-12">
        <div className="space-y-4">
          <h3>Disposição na página</h3>
          <SortableFlats initialData={flats} />
        </div>
        <div className="flex-1 flex flex-col gap-5 sm:gap-10 items-center">
          <FlatList initialData={flats} maxSizeItemsMd={true} />
        </div>
      </div>
    </>
  );
};

export default FlatsPage;
