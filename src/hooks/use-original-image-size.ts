"use client";

import { useEffect, useState } from "react";

type ImageSize = { url: string; width: number; height: number };

/**
 * Real pixel size of the original file at `url` (not the optimized copy
 * next/image serves), read by loading it in the browser. null while loading.
 */
export const useOriginalImageSize = (url?: string | null) => {
  const [size, setSize] = useState<ImageSize | null>(null);

  useEffect(() => {
    if (!url) return;
    let active = true;
    const img = new window.Image();
    img.onload = () => {
      if (active) {
        setSize({ url, width: img.naturalWidth, height: img.naturalHeight });
      }
    };
    img.src = url;
    return () => {
      active = false;
    };
  }, [url]);

  return size && size.url === url ? size : null;
};
