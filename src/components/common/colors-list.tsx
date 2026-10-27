"use client";

import VisibilitySwitch from "@/app/(no-layout)/admin/components/visibility-switch";
import { ColorDTO } from "@/app/data/colorization/colors-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { colorizationTable } from "@/db/schema";
import {
  centeredGridClassName,
  centeredGridItemClassName,
  centeredGridStyles,
} from "@/helpers/centered-grid";
import { useColorsList, useVisibleColors } from "@/hooks/queries/use-colors";
import { cn } from "@/lib/utils";

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

const AllColorsList = ({
  displayButtonOpenModal,
  ...props
}: ColorsListProps) => {
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
  const colorsWithImage = colors.filter((color) => color.image);
  const itemStyles = centeredGridStyles(
    colorsWithImage.map((color) => color.image!.horizontalPage)
  );

  return (
    <div
      className={cn(
        "w-full max-w-4xl xl:max-w-full mx-auto",
        centeredGridClassName
      )}
    >
      {colorsWithImage.map((color, index) => (
        <div
          key={color.id}
          className={centeredGridItemClassName}
          style={itemStyles[index]}
        >
          <ColorItem
            key={color.id}
            title={color.image!.title}
            imageId={color.image!.id}
            imageUrl={color.image!.imageUrl}
            credits={color.image!}
            observation={color.observations}
            visibleInColors={color.visibleInColors}
            horizontalPage={color.image!.horizontalPage}
            disableLink={displayButtonOpenModal}
            index={index}
          >
            {displayButtonOpenModal && (
              <>
                <VisibilitySwitch
                  entity="color"
                  id={color.id}
                  visible={color.visibleInColors}
                />
                <ExpandItemButton
                  typeLink
                  href={`/admin/cores/update?colorId=${color.id}`}
                />
              </>
            )}
          </ColorItem>
        </div>
      ))}
    </div>
  );
};

export default ColorsList;
