import Link from "next/link";

import { ProjectSummaryDTO } from "@/app/data/project/project-dto";
import {
  gridImageSizes,
  imageLoadingProps,
  PRIORITY_ITEMS,
} from "@/helpers/image-sizes";
import { staggerClassName, staggerStyle } from "@/helpers/stagger";
import { cn } from "@/lib/utils";

import ArtworkCaption from "./artwork-caption";
import ArtworkTransition from "./artwork-transition";
import FadeImage from "./fade-image";

interface ProjectCardProps {
  project: ProjectSummaryDTO;
  index: number;
  disableLink?: boolean;
  children?: React.ReactNode;
}

const ProjectCard = ({
  project,
  index,
  disableLink,
  children,
}: ProjectCardProps) => {
  const { slug, title, cover, visibleInProjects } = project;

  const card = (
    <div
      style={staggerStyle(index)}
      className={cn(
        "group relative aspect-square overflow-hidden bg-muted",
        staggerClassName,
        !visibleInProjects && "opacity-50"
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
      <ArtworkCaption title={title} className={cn(!cover && "opacity-100")} />
      {children}
    </div>
  );

  if (disableLink) return card;

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
