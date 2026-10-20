import { Metadata } from "next";

import { getVisibleIllustrations } from "@/actions/get-visible-illustrations";
import IllustrationsList from "@/components/common/illustrations-list";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Cores",
  description:
    "Página dos projetos de ilustração no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio.",
};

const IllustrationsPage = async () => {
  const illustrationsVisible = await getVisibleIllustrations();

  return (
    <div className="px-5 flex-1 flex flex-col">
      <IllustrationsList variant="visible" initialData={illustrationsVisible} />
    </div>
  );
};

export default IllustrationsPage;
