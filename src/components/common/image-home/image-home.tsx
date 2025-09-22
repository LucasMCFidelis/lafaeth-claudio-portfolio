import Image, { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

const ImageHome = ({ src, alt, className, ...rest }: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn("object-cover", className)}
      {...rest}
    />
  );
};

export default ImageHome;
