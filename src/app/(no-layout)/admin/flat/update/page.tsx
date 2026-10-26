import { Suspense } from "react";

import { getFlat } from "@/actions/get-flat";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { flatsQueries } from "@/queries/flats";

import AdminOnly from "../../components/admin-only";
import UpdateFlatForm from "../components/update-flat-form";

type SearchParams = Promise<{ flatId: string }>;

const UpdateFlatPage = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <AdminOnly>
        <UpdateFlatContent searchParams={searchParams} />
      </AdminOnly>
    </Suspense>
  );
};

const UpdateFlatContent = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { flatId } = await searchParams;

  return (
    <PrefetchBoundary
      queries={[
        {
          queryKey: flatsQueries.keys.detail(flatId),
          fetcher: () => getFlat({ flatId }),
        },
      ]}
    >
      <UpdateFlatForm flatId={flatId} />
    </PrefetchBoundary>
  );
};

export default UpdateFlatPage;
