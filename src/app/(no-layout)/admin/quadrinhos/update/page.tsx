import getOneComicById from "@/app/data/comics/get-one-comic-by-id";

import UpdateComicForm from "../components/update-comic-form";

const UpdateComicPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ comicId: string }>;
}) => {
  const { comicId } = await searchParams;

  const comic = await getOneComicById({ comicId });

  return <UpdateComicForm initialData={comic} />;
};

export default UpdateComicPage;
