"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";

import { ImageDTO } from "@/app/data/image/image-dto";
import { useAllImages } from "@/hooks/queries/use-all-images";

interface AllImagesContextProps {
  images: Array<ImageDTO>;
}

interface AllImagesProviderProps {
  children: ReactNode;
  initialImages: Array<ImageDTO>;
}

const AllImagesContext = createContext({} as AllImagesContextProps);

export const AllImagesProvider = ({
  children,
  initialImages,
}: AllImagesProviderProps) => {
  const { data: images } = useAllImages(
    initialImages && { initialData: initialImages }
  );

  const imagesMemo = useMemo(
    () => images ?? initialImages ?? [],
    [images, initialImages]
  );

  return (
    <AllImagesContext.Provider value={{ images: imagesMemo }}>
      {children}
    </AllImagesContext.Provider>
  );
};

export const useAllImagesContext = () => useContext(AllImagesContext);
