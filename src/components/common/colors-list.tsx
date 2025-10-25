"use client";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { WhereCondition } from "@/app/data/where-condition";
import { colorizationTable } from "@/db/schema";
import { useManyColors } from "@/hooks/queries/use-many-colors";

import ColorItem from "./color-item";
import ExpandItemButton from "./expand-item-button";

interface ColorsListProps {
  initialData: Array<ColorDTO<true>>;
  where?: WhereCondition<typeof colorizationTable>;
  orderBy?: OrderByCondition<typeof colorizationTable>;
  withImage?: boolean;
  displayButtonOpenModal?: boolean;
}
const ColorsList = ({
  initialData,
  where,
  orderBy,
  withImage,
  displayButtonOpenModal,
}: ColorsListProps) => {
  const { data: colors = [] } = useManyColors({
    params: { initialData },
    where,
    orderBy,
    withImage: !!withImage,
  });

  return (
    <div className="w-full max-w-4xl xl:max-w-full mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-flow-dense">
      {colors
        .filter((color) => color.image)
        .map((color) => (
          <div
            key={color.id}
            className={color.image!.horizontalPage ? "md:col-span-2" : ""}
          >
            <ColorItem
              key={color.id}
              title={color.image!.title}
              imageId={color.image!.id}
              imageUrl={color.image!.imageUrl}
              visibleInColors={color.visibleInColors}
              horizontalPage={color.image!.horizontalPage}
              disableLink={displayButtonOpenModal}
            >
              {displayButtonOpenModal && (
                <ExpandItemButton
                  typeLink
                  href={`/admin/cores/update?colorId=${color.id}`}
                />
              )}
            </ColorItem>
          </div>
        ))}
    </div>
  );
};

export default ColorsList;
