import { Metadata } from "next";

import getManyComics from "@/app/data/comics/get-many-comics";
import { WhereCondition } from "@/app/data/where-condition";
import ComicsList from "@/components/common/comics-list";
import { comicsTable } from "@/db/schema";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Quadrinhos",
  description:
    "Página dos projetos de quadrinhos no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página é destinada aos projetos de quadrinhos desenvolvidos pelo autor",
};

const ComicsPage = async () => {
  const where: WhereCondition<typeof comicsTable> = {
    field: "visibleInComics",
    value: true,
  };
  const comics = await getManyComics({ where, withImage: true });

  return (
    <div className="px-5 flex-1 flex flex-col">
      <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        <ComicsList initialData={comics} where={where} withImage={true} />
      </div>
    </div>
  );
};

export default ComicsPage;
