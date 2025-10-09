import { Metadata } from "next";

import { getFlats } from "@/actions/get-many-flats";
import { WhereCondition } from "@/app/data/where-condition";
import FlatList from "@/components/common/flat-list";
import { flatTable } from "@/db/schema";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Flat",
  description:
    "Página dos projetos de Flat no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página é destinada aos projetos de Flat com suporte a comparação das imagens de flat e line",
};

const FlatPage = async () => {
  const where: WhereCondition<typeof flatTable> = {
    field: "visibleInFlat",
    value: true,
  };
  const flats = await getFlats(where);

  return (
    <div className="px-5 flex-1 flex flex-col">
      <div className="flex-1 flex flex-col gap-5 sm:gap-10 items-center">
        <FlatList initialData={flats} where={where} />
      </div>
    </div>
  );
};

export default FlatPage;
