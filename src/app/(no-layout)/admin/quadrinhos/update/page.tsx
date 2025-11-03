import { Suspense } from "react";

import getOneComicById from "@/app/data/comics/get-one-comic-by-id";

import UpdateComicForm from "../components/update-comic-form";

const UpdateComicPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ comicId: string }>;
}) => {
  const { comicId } = await searchParams;

  const comic = await getOneComicById({ comicId });

  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <UpdateComicForm initialData={comic} />;
    </Suspense>
  );
};

export default UpdateComicPage;
