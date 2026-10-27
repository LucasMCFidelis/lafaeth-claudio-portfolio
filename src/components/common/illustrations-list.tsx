"use client";

import VisibilitySwitch from "@/app/(no-layout)/admin/components/visibility-switch";
import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { illustrationsTable } from "@/db/schema";
import {
  centeredGridClassName,
  centeredGridItemClassName,
  centeredGridStyles,
} from "@/helpers/centered-grid";
import {
  useIllustrationsList,
  useVisibleIllustrations,
} from "@/hooks/queries/use-illustrations";
import { cn } from "@/lib/utils";

import ExpandItemButton from "./expand-item-button";
import IllustrationItem from "./illustration-item";

type IllustrationsListProps = {
  displayButtonOpenModal?: boolean;
} & (
  | { variant: "visible" }
  | { variant: "all"; orderBy?: OrderByCondition<typeof illustrationsTable> }
);

const IllustrationsList = (props: IllustrationsListProps) =>
  props.variant === "visible" ? (
    <VisibleIllustrationsList {...props} />
  ) : (
    <AllIllustrationsList {...props} />
  );

const VisibleIllustrationsList = ({
  displayButtonOpenModal,
}: IllustrationsListProps) => {
  const { data: illustrations } = useVisibleIllustrations();

  return (
    <IllustrationsGrid
      illustrations={illustrations}
      displayButtonOpenModal={displayButtonOpenModal}
    />
  );
};

const AllIllustrationsList = ({
  displayButtonOpenModal,
  ...props
}: IllustrationsListProps) => {
  const { data: illustrations } = useIllustrationsList({
    orderBy: props.variant === "all" ? props.orderBy : undefined,
  });

  return (
    <IllustrationsGrid
      illustrations={illustrations}
      displayButtonOpenModal={displayButtonOpenModal}
    />
  );
};

interface IllustrationsGridProps {
  illustrations: Array<IllustrationDTO<boolean>>;
  displayButtonOpenModal?: boolean;
}

const IllustrationsGrid = ({
  illustrations,
  displayButtonOpenModal,
}: IllustrationsGridProps) => {
  const illustrationsWithImage = illustrations.filter(
    (illustration) => illustration.image
  );
  const itemStyles = centeredGridStyles(
    illustrationsWithImage.map(
      (illustration) => illustration.image!.horizontalPage
    )
  );

  return (
    <div
      className={cn(
        "w-full max-w-4xl xl:max-w-full mx-auto",
        centeredGridClassName
      )}
    >
      {illustrationsWithImage.map((illustration, index) => (
        <div
          key={illustration.id}
          className={centeredGridItemClassName}
          style={itemStyles[index]}
        >
          <IllustrationItem
            key={illustration.id}
            title={illustration.image!.title}
            imageId={illustration.image!.id}
            imageUrl={illustration.image!.imageUrl}
            visibleInIllustrations={illustration.visibleInIllustrations}
            horizontalPage={illustration.image!.horizontalPage}
            disableLink={displayButtonOpenModal}
            index={index}
          >
            {displayButtonOpenModal && (
              <>
                <VisibilitySwitch
                  entity="illustration"
                  id={illustration.id}
                  visible={illustration.visibleInIllustrations}
                />
                <ExpandItemButton
                  typeLink
                  href={`/admin/ilustracoes/update?illustrationId=${illustration.id}`}
                />
              </>
            )}
          </IllustrationItem>
        </div>
      ))}
    </div>
  );
};

export default IllustrationsList;
