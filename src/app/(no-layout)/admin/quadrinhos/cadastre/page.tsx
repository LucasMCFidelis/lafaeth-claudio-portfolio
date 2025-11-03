import { Suspense } from "react";

import CadastreComicForm from "../components/cadastre-comic-form";

const CadastreComicPage = async () => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <CadastreComicForm />
    </Suspense>
  );
};

export default CadastreComicPage;
