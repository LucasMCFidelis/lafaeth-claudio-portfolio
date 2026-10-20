import { Suspense } from "react";

import getOneColorById from "@/app/data/colorization/get-one-color-by-id";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { colorsQueries } from "@/queries/colors";

import AdminOnly from "../../components/admin-only";
import UpdateColorForm from "../components/update-color-form";

type SearchParams = Promise<{ colorId: string }>;

const UpdateColorPage = ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <AdminOnly>
        <UpdateColorContent searchParams={searchParams} />
      </AdminOnly>
    </Suspense>
  );
};

const UpdateColorContent = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { colorId } = await searchParams;

  return (
    <PrefetchBoundary
      queries={[
        {
          queryKey: colorsQueries.keys.detail(colorId),
          fetcher: () => getOneColorById({ colorId }),
        },
      ]}
    >
      <UpdateColorForm colorId={colorId} />
    </PrefetchBoundary>
  );
};

export default UpdateColorPage;
