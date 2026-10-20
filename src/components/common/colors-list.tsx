"use client";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { colorizationTable } from "@/db/schema";
import { PRIORITY_ITEMS } from "@/helpers/image-sizes";
import { useColorsList, useVisibleColors } from "@/hooks/queries/use-colors";

import ColorItem from "./color-item";
import ExpandItemButton from "./expand-item-button";

type ColorsListProps = {
  displayButtonOpenModal?: boolean;
} & (
  | { variant: "visible" }
  | {
      variant: "all";
      orderBy?: OrderByCondition<typeof colorizationTable>;
    }
);

const ColorsList = (props: ColorsListProps) =>
  props.variant === "visible" ? (
    <VisibleColorsList {...props} />
  ) : (
    <AllColorsList {...props} />
  );

const VisibleColorsList = ({ displayButtonOpenModal }: ColorsListProps) => {
  const { data: colors } = useVisibleColors();

  return (
    <ColorsGrid
      colors={colors}
      displayButtonOpenModal={displayButtonOpenModal}
    />
  );
};

const AllColorsList = ({ displayButtonOpenModal, ...props }: ColorsListProps) => {
  const { data: colors } = useColorsList({
    orderBy: props.variant === "all" ? props.orderBy : undefined,
  });

  return (
    <ColorsGrid
      colors={colors}
      displayButtonOpenModal={displayButtonOpenModal}
    />
  );
};

interface ColorsGridProps {
  colors: Array<ColorDTO<boolean>>;
  displayButtonOpenModal?: boolean;
}

const ColorsGrid = ({ colors, displayButtonOpenModal }: ColorsGridProps) => {
  return (
    <div className="w-full max-w-4xl xl:max-w-full mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-flow-dense">
      {colors
        .filter((color) => color.image)
        .map((color, index) => (
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
              priority={index < PRIORITY_ITEMS}
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
