import { Suspense } from "react";

import getOneComicById from "@/app/data/comics/get-one-comic-by-id";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { comicsQueries } from "@/queries/comics";

import AdminOnly from "../../components/admin-only";
import UpdateComicForm from "../components/update-comic-form";

type SearchParams = Promise<{ comicId: string }>;

const UpdateComicPage = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <AdminOnly>
        <UpdateComicContent searchParams={searchParams} />
      </AdminOnly>
    </Suspense>
  );
};

const UpdateComicContent = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { comicId } = await searchParams;

  return (
    <PrefetchBoundary
      queries={[
        {
          queryKey: comicsQueries.keys.detail(comicId),
          fetcher: () => getOneComicById({ comicId }),
        },
      ]}
    >
      {/* Keyed so the form restarts when another item is opened (Activity keeps the page mounted). */}
      <UpdateComicForm key={comicId} comicId={comicId} />
    </PrefetchBoundary>
  );
};

export default UpdateComicPage;
