"use client";

import Image from "next/image";

import { ProjectImageAdminDTO } from "@/app/data/project/project-dto";
import { useDeleteProjectImage } from "@/hooks/mutations/use-delete-project-image";
import { cn } from "@/lib/utils";

import DeleteItemButton from "../../components/delete-item-button";
import VisibilitySwitch from "../../components/visibility-switch";
import EditProjectImageDialog from "./edit-project-image-dialog";

interface ProjectImageAdminCardProps {
  image: ProjectImageAdminDTO;
  isCover: boolean;
}

const ProjectImageAdminCard = ({
  image,
  isCover,
}: ProjectImageAdminCardProps) => {
  const deleteProjectImageMutation = useDeleteProjectImage();

  return (
    <div className="flex flex-col gap-3 rounded-xl border p-3 shadow-sm">
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-lg bg-accent",
          !image.visibleInProject && "opacity-50"
        )}
      >
        <Image
          src={image.imageUrl}
          alt={image.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-contain"
        />
        <VisibilitySwitch
          entity="projectImage"
          id={image.id}
          visible={image.visibleInProject}
        />
        {isCover && (
          <span className="absolute top-2 right-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground shadow">
            Capa
          </span>
        )}
      </div>
      <p className="font-medium line-clamp-1" title={image.title}>
        {image.title}
      </p>
      <div className="flex gap-2">
        <EditProjectImageDialog image={image} />
        <DeleteItemButton
          itemName="esta imagem"
          description="Essa ação não pode ser desfeita."
          onDelete={() => deleteProjectImageMutation.mutateAsync(image.id)}
          className="flex-1 w-auto"
        />
      </div>
    </div>
  );
};

export default ProjectImageAdminCard;
