import { Suspense } from "react";

import AdminOnly from "../../components/admin-only";
import CadastreProjectForm from "../components/cadastre-project-form";

const CadastreProjectPage = () => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <AdminOnly>
        <CadastreProjectForm />
      </AdminOnly>
    </Suspense>
  );
};

export default CadastreProjectPage;
