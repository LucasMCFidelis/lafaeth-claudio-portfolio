import { Metadata } from "next";

import getManyColors, {
  GetManyColorsProps,
} from "@/app/data/colorization/get-many-colors";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { WhereCondition } from "@/app/data/where-condition";
import ColorsList from "@/components/common/colors-list";
import { colorizationTable } from "@/db/schema";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Cores",
  description:
    "Página dos projetos de colorização no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página é destinada aos projetos desenvolvidos pelo autor na área de cores",
};

const ColorsPage = async () => {
  const where: WhereCondition<typeof colorizationTable> = {
    field: "visibleInColorization",
    value: true,
  };
  const orderBy: OrderByCondition<typeof colorizationTable> = {
    field: "index",
    type: "asc",
  };
  const clauseGetColors: GetManyColorsProps<true> = {
    where,
    orderBy,
    withImage: true,
  };
  const colorizationVisible = await getManyColors<
    typeof clauseGetColors.withImage
  >({ ...clauseGetColors });

  return (
    <div className="px-5 flex-1 flex flex-col">
      <ColorsList initialData={colorizationVisible} {...clauseGetColors} />
    </div>
  );
};

export default ColorsPage;
