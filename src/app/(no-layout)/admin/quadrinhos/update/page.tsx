import { getAllImages } from "@/actions/get-all-images";
import getOneComicById from "@/app/data/comics/get-one-comic-by-id";

import UpdateComicForm from "../components/update-comic-form";

const UpdateComicPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ comicId: string }>;
}) => {
  const { comicId } = await searchParams;

  const [allImages, comic] = await Promise.all([
    getAllImages(),
    getOneComicById({ comicId }),
  ]);

  return <UpdateComicForm initialData={comic} imagesToSelect={allImages} />;
};

export default UpdateComicPage;
