import { ProjectImageDTO } from "@/app/data/project/project-dto";
import { staggerClassName, staggerStyle } from "@/helpers/stagger";

import ProjectImage from "./project-image";

interface ProjectImagesColumnsProps {
  images: ProjectImageDTO[];
  galleryHref: string;
}

const COLUMNS = 2;

const ProjectImagesColumns = ({
  images,
  galleryHref,
}: ProjectImagesColumnsProps) => {
  if (images.length === 0) return null;

  const columns = Array.from({ length: COLUMNS }, (_, column) =>
    images
      .map((image, index) => ({ image, index }))
      .filter(({ index }) => index % COLUMNS === column)
  );

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      {columns.map((items, column) => (
        <div key={column} className="contents md:flex md:flex-1 md:flex-col md:gap-6">
          {items.map(({ image, index }) => (
            <ProjectImage
              key={image.id}
              image={image}
              galleryHref={galleryHref}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={staggerClassName}
              style={{ order: index, ...staggerStyle(index) }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectImagesColumns;
