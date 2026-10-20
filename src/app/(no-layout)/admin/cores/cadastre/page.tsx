import { Suspense } from "react";

import requireAdmin from "@/app/data/user/require-admin";

import CadastreColorForm from "../components/cadastre-color-form";

const CadastreColorPage = async () => {
  await requireAdmin();

  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <CadastreColorForm />;
    </Suspense>
  );
};

export default CadastreColorPage;
