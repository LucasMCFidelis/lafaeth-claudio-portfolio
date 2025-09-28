import { Metadata } from "next";
import Image from "next/image";

import getManyFlats from "@/app/data/flat/get-many-flats";

import FlatItem from "./components/flat-item";

export const metadata: Metadata = {
  title: "Portfolio Lafaeth Claudio - Flat",
  description:
    "Página dos projetos de Flat no portfolio do Design, Ilustrador e Quadrinista Lafaeth Claudio. Essa página é destinada aos projetos de Flat com suporte a comparação das imagens de flat e line",
};

const FlatPage = async () => {
  const flats = await getManyFlats({
    where: { field: "visibleInFlat", value: true },
    withImages: true,
  });

  return (
    <div className="px-5 flex-1 flex flex-col">
      <div className="flex-1 flex flex-col gap-5 sm:gap-10 items-center">
        {flats.map((flat) => {
          const screenwriter =
            flat.backImage?.screenwriter || flat.frontImage?.screenwriter;
          const artist = flat.backImage?.artist || flat.frontImage?.artist;
          return (
            <FlatItem key={flat.id} flat={flat}>
              {flat.backImage?.imageUrl && (
                <Image
                  src={flat.backImage?.imageUrl}
                  alt={`${flat.title} - flat`}
                  fill
                  className={`object-contain overflow-hidden object-left z-10 pointer-events-none`}
                />
              )}

              <div className="absolute z-30 w-full flex justify-between text-primary-foreground text-[0.5rem]">
                {screenwriter && (
                  <p className="bg-primary/70 px-2">Roteiro: {screenwriter}</p>
                )}
                <p className="bg-primary/70 px-2">Arte: {artist}</p>
              </div>
            </FlatItem>
          );
        })}
      </div>
    </div>
  );
};

export default FlatPage;
