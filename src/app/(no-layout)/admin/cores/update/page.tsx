import { Suspense } from "react";

import getOneColorById from "@/app/data/colorization/get-one-color-by-id";

import UpdateColorForm from "../components/update-color-form";

const UpdateColorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ colorId: string }>;
}) => {
  const { colorId } = await searchParams;
  const colorInitialData = await getOneColorById({ colorId });

  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <UpdateColorForm initialData={colorInitialData} />;
    </Suspense>
  );
};

export default UpdateColorPage;
