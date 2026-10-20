"use client";

import { ColorDTO } from "@/app/data/colorization/colors-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { colorizationTable } from "@/db/schema";
import { useColorsVisible } from "@/hooks/queries/use-colors-visible";
import { useManyColors } from "@/hooks/queries/use-many-colors";

import ColorItem from "./color-item";
import ExpandItemButton from "./expand-item-button";

type ColorsListProps = {
  initialData: Array<ColorDTO<true>>;
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

const VisibleColorsList = ({
  initialData,
  displayButtonOpenModal,
}: ColorsListProps) => {
  const { data: colors = [] } = useColorsVisible({ initialData });

  return (
    <ColorsGrid
      colors={colors}
      displayButtonOpenModal={displayButtonOpenModal}
    />
  );
};

const AllColorsList = ({
  initialData,
  displayButtonOpenModal,
  ...props
}: ColorsListProps) => {
  const { data: colors = [] } = useManyColors({
    params: { initialData },
    orderBy: props.variant === "all" ? props.orderBy : undefined,
    withImage: true,
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
