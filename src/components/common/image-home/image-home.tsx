import { ImageProps } from "next/image";

import { gridImageSizes } from "@/helpers/image-sizes";
import { cn } from "@/lib/utils";

import FadeImage from "../fade-image";

const ImageHome = ({
  src,
  alt,
  className,
  sizes = gridImageSizes,
  ...rest
}: ImageProps) => {
  return (
    <FadeImage
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={cn("object-cover group-hover:scale-[1.02]", className)}
      {...rest}
    />
  );
};

export default ImageHome;
