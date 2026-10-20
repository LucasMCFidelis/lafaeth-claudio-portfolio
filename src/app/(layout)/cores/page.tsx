import { Metadata } from "next";

import { getVisibleColors } from "@/actions/get-visible-colors";
import ColorsList from "@/components/common/colors-list";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Cores",
  description:
    "Página dos projetos de colorização no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página é destinada aos projetos desenvolvidos pelo autor na área de cores",
};

const ColorsPage = async () => {
  const colorizationVisible = await getVisibleColors();

  return (
    <div className="px-5 flex-1 flex flex-col">
      <ColorsList variant="visible" initialData={colorizationVisible} />
    </div>
  );
};

export default ColorsPage;
