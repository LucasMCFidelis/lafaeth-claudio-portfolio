import { Metadata } from "next";

import { getVisibleComics } from "@/actions/get-visible-comics";
import ComicsList from "@/components/common/comics-list";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Quadrinhos",
  description:
    "Página dos projetos de quadrinhos no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página é destinada aos projetos de quadrinhos desenvolvidos pelo autor",
};

const ComicsPage = async () => {
  const comics = await getVisibleComics();

  return (
    <div className="px-5 flex-1 flex flex-col">
      <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        <ComicsList variant="visible" initialData={comics} />
      </div>
    </div>
  );
};

export default ComicsPage;
