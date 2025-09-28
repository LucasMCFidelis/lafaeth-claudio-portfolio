import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Quadrinhos",
  description:
    "Página dos projetos de quadrinhos no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página é destinada aos projetos de quadrinhos desenvolvidos pelo autor",
};

const ComicsPage = () => {
  return (
    <div className="px-5 flex-1 flex flex-col">
      <p>Quadrinhos</p>
    </div>
  );
};

export default ComicsPage;
