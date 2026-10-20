import { Suspense } from "react";

import AdminOnly from "../../components/admin-only";
import CadastreComicForm from "../components/cadastre-comic-form";

const CadastreComicPage = () => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <AdminOnly>
        <CadastreComicForm />
      </AdminOnly>
    </Suspense>
  );
};

export default CadastreComicPage;
