import { Suspense } from "react";

import AdminOnly from "../../components/admin-only";
import CadastreIllustrationForm from "../components/cadastre-illustration-form";

const CadastreIllustrationPage = () => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <AdminOnly>
        <CadastreIllustrationForm />
      </AdminOnly>
    </Suspense>
  );
};

export default CadastreIllustrationPage;
