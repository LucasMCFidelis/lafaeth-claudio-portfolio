import { Metadata } from "next";

import { getVisibleFlats } from "@/actions/get-visible-flats";
import FlatList from "@/components/common/flat-list";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Flat",
  description:
    "Página dos projetos de Flat no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página é destinada aos projetos de Flat com suporte a comparação das imagens de flat e line",
};

const FlatPage = async () => {
  const flats = await getVisibleFlats();

  return (
    <div className="px-5 flex-1 flex flex-col">
      <FlatList variant="visible" initialData={flats} />
    </div>
  );
};

export default FlatPage;
