import { getAllImages } from "@/actions/get-all-images";
import { getFlat } from "@/actions/get-flat";

import UpdateFlatForm from "../components/update-flat-form";

const UpdateFlatPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ flatId: string }>;
}) => {
  const { flatId } = await searchParams;

  const [allImages, flat] = await Promise.all([
    getAllImages(),
    getFlat({ flatId }),
  ]);

  return (
    <>
      <UpdateFlatForm initialData={flat} imagesToSelect={allImages} />
    </>
  );
};

export default UpdateFlatPage;
