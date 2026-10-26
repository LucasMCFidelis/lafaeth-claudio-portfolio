"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  UpdateProjectDTO,
  UpdateProjectInput,
  updateProjectSchema,
} from "@/app/data/schemas/update-project-schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useDeleteProject } from "@/hooks/mutations/use-delete-project";
import { useDuplicateProject } from "@/hooks/mutations/use-duplicate-project";
import { useUpdateProject } from "@/hooks/mutations/use-update-project";
import { useProject } from "@/hooks/queries/use-projects";
import { useFormIsEditable } from "@/hooks/states/use-form-is-editable";

import ActionsUpdateForm from "../../components/actions-update-forms";
import DeleteItemButton from "../../components/delete-item-button";
import ProjectFormFields from "./project-form-fields";

interface UpdateProjectFormProps {
  projectId: string;
}

const UpdateProjectForm = ({ projectId }: UpdateProjectFormProps) => {
  const { data: project } = useProject(projectId);
  const updateProjectMutation = useUpdateProject(project.id);
  const deleteProjectMutation = useDeleteProject();
  const duplicateProjectMutation = useDuplicateProject();
  const router = useRouter();
  const [formIsEditable, setFormIsEditable] = useFormIsEditable();

  const formDefaultValues: UpdateProjectInput = {
    id: project.id,
    title: project.title,
    slug: project.slug,
    projectType: project.projectType ?? "",
    startDate: project.startDate.slice(0, 7),
    endDate: project.endDate?.slice(0, 7) ?? "",
    description: project.description,
    visibleInProjects: project.visibleInProjects,
    imageColumns: project.imageColumns,
  };

  const form = useForm<UpdateProjectInput, unknown, UpdateProjectDTO>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: formDefaultValues,
  });

  function onSubmit(data: UpdateProjectDTO) {
    updateProjectMutation.mutate(data, {
      onSuccess: (result) => {
        if (!result.success) {
          form.setError("slug", {
            message: "Já existe um projeto com esse endereço",
          });
          return;
        }
        toast.success("Projeto atualizado com sucesso");
        setFormIsEditable(false);
      },
      onError: (error) =>
        toast.error(
          error instanceof Error ? error.message : "Erro ao atualizar projeto"
        ),
    });
  }

  function duplicate() {
    duplicateProjectMutation.mutate(project.id, {
      onSuccess: (result) => {
        toast.success("Cópia criada como rascunho");
        router.push(`/admin/portfolio/update?projectId=${result.project.id}`);
      },
      onError: (error) =>
        toast.error(
          error instanceof Error ? error.message : "Erro ao duplicar projeto"
        ),
    });
  }

  const busy =
    updateProjectMutation.isPending || duplicateProjectMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12">
        <ProjectFormFields
          disabled={!formIsEditable || updateProjectMutation.isPending}
        >
          <ActionsUpdateForm
            textSaveUpdateAction="Atualizar Projeto"
            disableSaveUpdateAction={updateProjectMutation.isPending}
            resetForm={() => form.reset(formDefaultValues)}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <Button type="button" variant="outline" asChild>
              {project.visibleInProjects ? (
                <Link href={`/portfolio/${project.slug}`} target="_blank">
                  <ExternalLink />
                  Ver no site
                </Link>
              ) : (
                <Link
                  href={`/portfolio/preview/${project.id}`}
                  target="_blank"
                >
                  <Eye />
                  Ver prévia
                </Link>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={duplicate}
              disabled={busy}
            >
              <Copy />
              Duplicar
            </Button>
            <DeleteItemButton
              itemName="este projeto"
              description="Essa ação não pode ser desfeita. As imagens do projeto também serão excluídas."
              onDelete={() => deleteProjectMutation.mutateAsync(project.id)}
              redirectTo="/admin/portfolio"
              disabled={busy}
            />
          </div>
        </ProjectFormFields>
      </form>
    </Form>
  );
};

export default UpdateProjectForm;
