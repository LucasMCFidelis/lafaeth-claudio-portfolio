import { Metadata } from "next";

import getManyIllustrations, {
  GetManyIllustrationsProps,
} from "@/app/data/illustrations/get-many-illustration";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { WhereCondition } from "@/app/data/where-condition";
import IllustrationsList from "@/components/common/illustrations-list";
import { illustrationsTable } from "@/db/schema";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Cores",
  description:
    "Página dos projetos de ilustração no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio.",
};

const IllustrationsPage = async () => {
  const where: WhereCondition<typeof illustrationsTable> = {
    field: "visibleInIllustrations",
    value: true,
  };
  const orderBy: OrderByCondition<typeof illustrationsTable> = {
    field: "index",
    type: "asc",
  };
  const clauseGetColors: GetManyIllustrationsProps<true> = {
    where,
    orderBy,
    withImage: true,
  };
  const illustrationsVisible = await getManyIllustrations<
    typeof clauseGetColors.withImage
  >({ ...clauseGetColors });

  return (
    <div className="px-5 flex-1 flex flex-col">
      <IllustrationsList
        initialData={illustrationsVisible}
        {...clauseGetColors}
      />
    </div>
  );
};

export default IllustrationsPage;
