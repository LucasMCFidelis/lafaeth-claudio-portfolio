import Link from "next/link";

import { ProjectImageDTO } from "@/app/data/project/project-dto";
import ArtworkTransition from "@/components/common/artwork-transition";
import FadeImage from "@/components/common/fade-image";
import { imageLoadingProps } from "@/helpers/image-sizes";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  image: ProjectImageDTO;
  galleryHref: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  style?: React.CSSProperties;
}

const ProjectImage = ({
  image,
  galleryHref,
  sizes,
  priority,
  className,
  imageClassName,
  style,
}: ProjectImageProps) => {
  return (
    <Link
      href={`${galleryHref}?id=${image.id}`}
      className={cn("block", className)}
      style={style}
    >
      <ArtworkTransition imageId={image.id}>
        <div className="group relative overflow-hidden">
          <FadeImage
            src={image.imageUrl}
            alt={image.title}
            width={1600}
            height={1000}
            sizes={sizes}
            {...imageLoadingProps(priority)}
            className={cn(
              "w-full h-auto group-hover:scale-[1.02]",
              imageClassName
            )}
          />
        </div>
      </ArtworkTransition>
    </Link>
  );
};

export default ProjectImage;
