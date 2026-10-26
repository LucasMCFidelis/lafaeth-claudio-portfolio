import { ProjectDTO, ProjectLinkDTO } from "@/app/data/project/project-dto";

import ProjectHeader from "./project-header";
import ProjectImage from "./project-image";
import ProjectImagesColumns from "./project-images-columns";
import ProjectNavigation from "./project-navigation";

interface ProjectArticleProps {
  project: ProjectDTO;
  prev?: ProjectLinkDTO | null;
  next?: ProjectLinkDTO | null;
  /** Without it (draft preview) the images do not open the gallery. */
  galleryHref?: string;
  /** Shown above the header (e.g. the preview bar). */
  children?: React.ReactNode;
}

/** The project page body, shared by the public page and the admin preview. */
const ProjectArticle = ({
  project,
  prev = null,
  next = null,
  galleryHref,
  children,
}: ProjectArticleProps) => {
  return (
    <article className="flex flex-col gap-10 w-11/12 mx-auto">
      {children}
      <ProjectHeader project={project} />
      {project.cover && (
        <ProjectImage
          image={project.cover}
          galleryHref={galleryHref}
          sizes="92vw"
          priority
          imageClassName="h-svh object-cover"
        />
      )}
      <ProjectImagesColumns
        images={project.images}
        columns={project.imageColumns}
        galleryHref={galleryHref}
      />
      <ProjectNavigation prev={prev} next={next} />
    </article>
  );
};

export default ProjectArticle;
