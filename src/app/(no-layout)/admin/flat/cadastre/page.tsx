import { Suspense } from "react";

import CadastreFlatForm from "../components/cadastre-flat-form";

const CadastreFlatPage = () => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <CadastreFlatForm />
    </Suspense>
  );
};

export default CadastreFlatPage;
