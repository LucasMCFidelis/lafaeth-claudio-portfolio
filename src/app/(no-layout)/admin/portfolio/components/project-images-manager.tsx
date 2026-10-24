"use client";

import { useProjectImages } from "@/hooks/queries/use-projects";

import SortableProjectImages from "../../components/sortable-items/sortable-project-images";
import CadastreProjectImageDialog from "./cadastre-project-image-dialog";
import ProjectImageAdminCard from "./project-image-admin-card";

interface ProjectImagesManagerProps {
  projectId: string;
}

const ProjectImagesManager = ({ projectId }: ProjectImagesManagerProps) => {
  const { data: images } = useProjectImages(projectId);
  const coverId = images.find((image) => image.visibleInProject)?.id;

  return (
    <section className="flex flex-col gap-4 border-t pt-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Imagens do projeto</h2>
          <p className="text-sm text-muted-foreground">
            A primeira imagem visível é a capa na lista e o banner do projeto.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SortableProjectImages projectId={projectId} />
          <CadastreProjectImageDialog projectId={projectId} />
        </div>
      </div>
      {images.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">
          Nenhuma imagem cadastrada.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((image) => (
            <ProjectImageAdminCard
              key={image.id}
              image={image}
              isCover={image.id === coverId}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectImagesManager;
