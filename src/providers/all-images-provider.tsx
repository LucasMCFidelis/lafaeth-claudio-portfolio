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
  /** False on pages without a session (the login page), where the fetch would fail. */
  enabled?: boolean;
}

const AllImagesContext = createContext({} as AllImagesContextProps);

export const AllImagesProvider = ({
  children,
  initialImages,
  enabled = true,
}: AllImagesProviderProps) => {
  const { data: images } = useAllImages({
    initialData: initialImages,
    enabled,
  });

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
