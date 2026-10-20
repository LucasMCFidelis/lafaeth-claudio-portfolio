import { Suspense } from "react";

import { getFlat } from "@/actions/get-flat";
import requireAdmin from "@/app/data/user/require-admin";

import UpdateFlatForm from "../components/update-flat-form";

const UpdateFlatPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ flatId: string }>;
}) => {
  await requireAdmin();

  const { flatId } = await searchParams;

  const flat = await getFlat({ flatId });

  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <UpdateFlatForm initialData={flat} />
    </Suspense>
  );
};

export default UpdateFlatPage;
