import getOneColorById from "@/app/data/colorization/get-one-color-by-id";

import UpdateColorForm from "../components/update-color-form";

const UpdateColorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ colorId: string }>;
}) => {
  const { colorId } = await searchParams;
  const colorInitialData = await getOneColorById({ colorId });

  return <UpdateColorForm initialData={colorInitialData} />;
};

export default UpdateColorPage;
