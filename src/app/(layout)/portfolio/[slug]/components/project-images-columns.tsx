import { ProjectImageDTO } from "@/app/data/project/project-dto";
import { staggerClassName, staggerStyle } from "@/helpers/stagger";

import ProjectImage from "./project-image";

interface ProjectImagesColumnsProps {
  images: ProjectImageDTO[];
  columns: 1 | 2;
  galleryHref: string;
}

/** One column fills the article (w-11/12); two columns split it from md up. */
const SIZES = {
  1: "92vw",
  2: "(max-width: 768px) 100vw, 50vw",
} as const;

const ProjectImagesColumns = ({
  images,
  columns,
  galleryHref,
}: ProjectImagesColumnsProps) => {
  if (images.length === 0) return null;

  const imageColumns = Array.from({ length: columns }, (_, column) =>
    images
      .map((image, index) => ({ image, index }))
      .filter(({ index }) => index % columns === column)
  );

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start">
      {imageColumns.map((items, column) => (
        <div key={column} className="contents md:flex md:flex-1 md:flex-col md:gap-6">
          {items.map(({ image, index }) => (
            <ProjectImage
              key={image.id}
              image={image}
              galleryHref={galleryHref}
              sizes={SIZES[columns]}
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
