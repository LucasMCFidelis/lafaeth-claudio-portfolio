import { getFlat } from "@/actions/get-flat";

import UpdateFlatForm from "../components/update-flat-form";

const UpdateFlatPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ flatId: string }>;
}) => {
  const { flatId } = await searchParams;

  const flat = await getFlat({ flatId });

  return (
    <>
      <UpdateFlatForm initialData={flat} />
    </>
  );
};

export default UpdateFlatPage;
