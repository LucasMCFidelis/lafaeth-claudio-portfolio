import { Suspense } from "react";

import getOneColorById from "@/app/data/colorization/get-one-color-by-id";
import requireAdmin from "@/app/data/user/require-admin";

import UpdateColorForm from "../components/update-color-form";

const UpdateColorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ colorId: string }>;
}) => {
  await requireAdmin();

  const { colorId } = await searchParams;
  const colorInitialData = await getOneColorById({ colorId });

  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <UpdateColorForm initialData={colorInitialData} />;
    </Suspense>
  );
};

export default UpdateColorPage;
