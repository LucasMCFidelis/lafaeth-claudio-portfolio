import { Suspense } from "react";

import CadastreColorForm from "../components/cadastre-color-form";

const CadastreColorPage = () => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <CadastreColorForm />;
    </Suspense>
  );
};

export default CadastreColorPage;
