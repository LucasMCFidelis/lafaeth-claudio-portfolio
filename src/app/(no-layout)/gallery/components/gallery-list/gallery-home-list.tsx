"use client";

import { useHomeImages } from "@/hooks/queries/use-images";

import GalleryRootList from "./gallery-root-list";

const GalleryHomeList = () => {
  const { data: images } = useHomeImages();

  return <GalleryRootList itemsList={images} />;
};

export default GalleryHomeList;
