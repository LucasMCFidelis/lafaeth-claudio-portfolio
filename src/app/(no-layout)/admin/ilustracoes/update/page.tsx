import { Suspense } from "react";

import getOneIllustrationById from "@/app/data/illustrations/get-one-illustration-by-id";
import PrefetchBoundary from "@/components/common/prefetch-boundary";
import { illustrationsQueries } from "@/queries/illustrations";

import AdminOnly from "../../components/admin-only";
import UpdateIllustrationForm from "../components/update-illustration-form";

type SearchParams = Promise<{ illustrationId: string }>;

const UpdateIllustrationPage = ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  return (
    <Suspense fallback={<p>Carregando formulário</p>}>
      <AdminOnly>
        <UpdateIllustrationContent searchParams={searchParams} />
      </AdminOnly>
    </Suspense>
  );
};

const UpdateIllustrationContent = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { illustrationId } = await searchParams;

  return (
    <PrefetchBoundary
      queries={[
        {
          queryKey: illustrationsQueries.keys.detail(illustrationId),
          fetcher: () => getOneIllustrationById({ illustrationId }),
        },
      ]}
    >
      <UpdateIllustrationForm illustrationId={illustrationId} />
    </PrefetchBoundary>
  );
};

export default UpdateIllustrationPage;
