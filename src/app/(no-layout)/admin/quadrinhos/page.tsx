import Link from "next/link";
import { Suspense } from "react";

import getManyComics from "@/app/data/comics/get-many-comics";
import ComicsList from "@/components/common/comics-list";
import { Button } from "@/components/ui/button";

import SortableComics from "../components/sortable-items/sortable-comics";

const ComicsAdminPage = async () => {
  const comics = await getManyComics({
    withImage: true,
  });

  return (
    <Suspense>
      <Link href={"/admin/quadrinhos/cadastre"}>
        <Button className="absolute top-0 right-0 -translate-x-4 translate-y-4">
          Adicionar Quadrinho
        </Button>
      </Link>

      <div className="px-5 flex-1 flex flex-col mt-12">
        <SortableComics
          initialData={comics.filter((comic) => comic.visibleInComics)}
        />
        <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
          <ComicsList
            displayButtonOpenModal
            initialData={comics}
            withImage={true}
          />
        </div>
      </div>
    </Suspense>
  );
};

export default ComicsAdminPage;
