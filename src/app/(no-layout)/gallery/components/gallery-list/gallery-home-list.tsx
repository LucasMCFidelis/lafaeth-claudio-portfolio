"use client";

import { ImageDTO } from "@/app/data/image/image-dto";
import { useHomeImages } from "@/hooks/queries/use-home-images";

import GalleryRootList from "./gallery-root-list";

interface GalleryHomeListProps {
  initialData?: Array<ImageDTO>;
}

const GalleryHomeList = ({ initialData }: GalleryHomeListProps) => {
  const { data: images = [] } = useHomeImages(initialData && { initialData });

  return <GalleryRootList imagesList={images} />;
};

export default GalleryHomeList;
