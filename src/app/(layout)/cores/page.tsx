import { Metadata } from "next";
import Image from "next/image";

import getManyColors from "@/app/data/colorization/get-many-colors";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { WhereCondition } from "@/app/data/where-condition";
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
  const colorizationVisible = await getManyColors({
    where,
    orderBy,
    withImage: true,
  });

  return (
    <div className="px-5 flex-1 flex flex-col">
      <div className="w-full max-w-4xl xl:max-w-full mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-flow-dense">
        {colorizationVisible.map((color) => (
          <div
            key={color.id}
            className={`relative ${!color.visibleInColors && "opacity-50"} ${
              color.image?.horizontalPage
                ? "md:col-span-2 aspect-[29.5/21]"
                : "aspect-[21/29.5]"
            }`}
          >
            <Image
              src={color.image?.imageUrl as string}
              alt={color.image?.title || "Colorização"}
              fill
              className="object-contain"
            />
            <div className="absolute inset-0 z-20 bg-primary/70 text-primary-foreground flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-1000 ease-in-out font-semibold">
              <p className="first-letter:uppercase">{color.image?.title}</p>
              <p className="first-letter:uppercase">{color.index}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorsPage;
