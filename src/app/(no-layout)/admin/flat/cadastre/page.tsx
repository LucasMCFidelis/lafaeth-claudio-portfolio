import { Suspense } from "react";

import AdminOnly from "../../components/admin-only";
import CadastreFlatForm from "../components/cadastre-flat-form";

const CadastreFlatPage = () => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <AdminOnly>
        <CadastreFlatForm />
      </AdminOnly>
    </Suspense>
  );
};

export default CadastreFlatPage;
