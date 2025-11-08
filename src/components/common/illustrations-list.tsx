"use client";

import { IllustrationDTO } from "@/app/data/illustrations/illustration-dto";
import { OrderByCondition } from "@/app/data/order-by-condition";
import { WhereCondition } from "@/app/data/where-condition";
import { illustrationsTable } from "@/db/schema";
import { useManyIllustrations } from "@/hooks/queries/use-many-illustrations";

import ExpandItemButton from "./expand-item-button";
import IllustrationItem from "./illustration-item";

interface IllustrationsListProps {
  initialData: Array<IllustrationDTO<true>>;
  where?: WhereCondition<typeof illustrationsTable>;
  orderBy?: OrderByCondition<typeof illustrationsTable>;
  withImage?: boolean;
  displayButtonOpenModal?: boolean;
}
const IllustrationsList = ({
  initialData,
  where,
  orderBy,
  withImage,
  displayButtonOpenModal,
}: IllustrationsListProps) => {
  const { data: illustrations } = useManyIllustrations({
    where,
    orderBy,
    withImage: withImage ?? false,
    params: { initialData },
  });

  return (
    <div className="w-full max-w-4xl xl:max-w-full mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-flow-dense">
      {illustrations &&
        illustrations.length > 0 &&
        illustrations
          .filter((illustration) => illustration.image)
          .map((illustration) => (
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
