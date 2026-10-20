import { Suspense } from "react";

import AdminOnly from "../../components/admin-only";
import CadastreColorForm from "../components/cadastre-color-form";

const CadastreColorPage = () => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <AdminOnly>
        <CadastreColorForm />
      </AdminOnly>
    </Suspense>
  );
};

export default CadastreColorPage;
