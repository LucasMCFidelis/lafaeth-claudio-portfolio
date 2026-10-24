import Link from "next/link";

import { ProjectSummaryDTO } from "@/app/data/project/project-dto";
import ArtworkCaption from "@/components/common/artwork-caption";
import ArtworkTransition from "@/components/common/artwork-transition";
import FadeImage from "@/components/common/fade-image";
import {
  gridImageSizes,
  imageLoadingProps,
  PRIORITY_ITEMS,
} from "@/helpers/image-sizes";
import { staggerClassName, staggerStyle } from "@/helpers/stagger";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectSummaryDTO;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { slug, title, cover } = project;

  const card = (
    <div
      style={staggerStyle(index)}
      className={cn(
        "group relative aspect-square overflow-hidden bg-muted",
        staggerClassName
      )}
    >
      {cover && (
        <FadeImage
          src={cover.imageUrl}
          alt={title}
          fill
          sizes={gridImageSizes}
          {...imageLoadingProps(index < PRIORITY_ITEMS)}
          className="object-cover group-hover:scale-[1.02]"
        />
      )}
      <ArtworkCaption title={title} />
    </div>
  );

  return (
    <Link href={`/portfolio/${slug}`} aria-label={title}>
      {cover ? (
        <ArtworkTransition imageId={cover.id}>{card}</ArtworkTransition>
      ) : (
        card
      )}
    </Link>
  );
};

export default ProjectCard;
