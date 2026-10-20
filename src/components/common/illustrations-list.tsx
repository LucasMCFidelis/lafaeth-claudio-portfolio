"use client";

import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { illustrationsTable } from "@/db/schema";
import {
  useIllustrationsList,
  useVisibleIllustrations,
} from "@/hooks/queries/use-illustrations";

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
  return (
    <div className="w-full max-w-4xl xl:max-w-full mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-flow-dense">
      {illustrations
        .filter((illustration) => illustration.image)
        .map((illustration, index) => (
          <div
            key={illustration.id}
            className={
              illustration.horizontalIllustration ? "md:col-span-2" : ""
            }
          >
            <IllustrationItem
              key={illustration.id}
              title={illustration.image!.title}
              imageId={illustration.image!.id}
              imageUrl={illustration.image!.imageUrl}
              visibleInIllustrations={illustration.visibleInIllustrations}
              horizontalIllustration={illustration.horizontalIllustration}
              disableLink={displayButtonOpenModal}
              index={index}
            >
              {displayButtonOpenModal && (
                <ExpandItemButton
                  typeLink
                  href={`/admin/ilustracoes/update?illustrationId=${illustration.id}`}
                />
              )}
            </IllustrationItem>
          </div>
        ))}
    </div>
  );
};

export default IllustrationsList;
