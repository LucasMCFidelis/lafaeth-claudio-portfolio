import { Suspense } from "react";

import requireAdmin from "@/app/data/user/require-admin";

import CadastreComicForm from "../components/cadastre-comic-form";

const CadastreComicPage = async () => {
  await requireAdmin();

  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <CadastreComicForm />
    </Suspense>
  );
};

export default CadastreComicPage;
