import { Suspense } from "react";

import requireAdmin from "@/app/data/user/require-admin";

import CadastreFlatForm from "../components/cadastre-flat-form";

const CadastreFlatPage = async () => {
  await requireAdmin();

  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <CadastreFlatForm />
    </Suspense>
  );
};

export default CadastreFlatPage;
