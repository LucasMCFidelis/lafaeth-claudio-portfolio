"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * next/image that shows a shimmer while loading and then fades the image in.
 * Use it like <Image fill />: the parent must be positioned (relative).
 * To restart the effect when the image changes, give it a `key` (e.g. src).
 */
const FadeImage = ({ className, onLoad, onError, alt, ...rest }: ImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <span
        aria-hidden
        className={cn(
          "shimmer pointer-events-none absolute inset-0 transition-opacity duration-500",
          loaded && "opacity-0"
        )}
      />
      <Image
        alt={alt}
        {...rest}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        // A broken image should not keep the shimmer forever.
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
        className={cn(
          "transition-[opacity,scale] duration-500 ease-out motion-reduce:transition-opacity",
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]",
          className
        )}
      />
    </>
  );
};

export default FadeImage;
