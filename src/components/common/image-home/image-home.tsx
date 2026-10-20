import Image, { ImageProps } from "next/image";

import { gridImageSizes } from "@/helpers/image-sizes";
import { cn } from "@/lib/utils";

const ImageHome = ({
  src,
  alt,
  className,
  sizes = gridImageSizes,
  ...rest
}: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={cn("object-cover", className)}
      {...rest}
    />
  );
};

export default ImageHome;
