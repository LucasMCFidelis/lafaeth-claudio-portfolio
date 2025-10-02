import { Metadata } from "next";

import { getFlatsVisible } from "@/actions/get-flats-visible";
import FlatList from "@/components/common/flat-list";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Flat",
  description:
    "Página dos projetos de Flat no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página é destinada aos projetos de Flat com suporte a comparação das imagens de flat e line",
};

const FlatPage = async () => {
  const flats = await getFlatsVisible();

  return (
    <div className="px-5 flex-1 flex flex-col">
      <div className="flex-1 flex flex-col gap-5 sm:gap-10 items-center">
        <FlatList initialData={flats} />
      </div>
    </div>
  );
};

export default FlatPage;
