"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  CadastreProjectDTO,
  CadastreProjectInput,
  cadastreProjectSchema,
} from "@/app/data/schemas/cadastre-project-schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePostProject } from "@/hooks/mutations/use-post-project";

import ProjectFormFields from "./project-form-fields";

const CadastreProjectForm = () => {
  const router = useRouter();
  const form = useForm<CadastreProjectInput, unknown, CadastreProjectDTO>({
    resolver: zodResolver(cadastreProjectSchema),
    defaultValues: {
      title: "",
      slug: "",
      projectType: "",
      startDate: "",
      endDate: "",
      description: "",
      visibleInProjects: false,
      imageColumns: 2,
    },
  });
  const postProjectMutation = usePostProject();

  function onSubmit(data: CadastreProjectDTO) {
    postProjectMutation.mutate(data, {
      onSuccess: (result) => {
        if (!result.success) {
          form.setError("slug", {
            message: "Já existe um projeto com esse endereço",
          });
          return;
        }
        toast.success("Projeto cadastrado. Agora adicione as imagens.");
        router.push(`/admin/portfolio/update?projectId=${result.project.id}`);
      },
      onError: (error) =>
        toast.error(
          error instanceof Error ? error.message : "Erro ao cadastrar projeto"
        ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12">
        <ProjectFormFields autoSlug disabled={postProjectMutation.isPending}>
          <Button
            type="submit"
            className="w-full"
            disabled={postProjectMutation.isPending}
          >
            Cadastrar Projeto
          </Button>
        </ProjectFormFields>
      </form>
    </Form>
  );
};

export default CadastreProjectForm;
