"use client";

import { ExternalLink, Pencil, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useUpdateVisibility } from "@/hooks/mutations/use-update-visibility";

interface PreviewBarProps {
  projectId: string;
  slug: string;
  published: boolean;
}

/** Top bar of the admin preview: back to editing and publish the draft. */
const PreviewBar = ({ projectId, slug, published }: PreviewBarProps) => {
  const router = useRouter();
  const updateVisibilityMutation = useUpdateVisibility("project");

  const publish = () =>
    updateVisibilityMutation.mutate(
      { id: projectId, visible: true },
      {
        onSuccess: () => {
          toast.success("Projeto publicado");
          router.push(`/portfolio/${slug}`);
        },
        onError: () => toast.error("Não foi possível publicar o projeto"),
      }
    );

  return (
    <div className="flex flex-col gap-4 rounded-md border border-dashed bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm">
        <span className="font-semibold">Prévia.</span>{" "}
        {published
          ? "Este projeto já está publicado."
          : "Rascunho: ainda não aparece no site."}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" asChild>
          <Link href={`/admin/portfolio/update?projectId=${projectId}`}>
            <Pencil />
            Voltar à edição
          </Link>
        </Button>
        {published ? (
          <Button asChild>
            <Link href={`/portfolio/${slug}`}>
              <ExternalLink />
              Ver no site
            </Link>
          </Button>
        ) : (
          <Button
            onClick={publish}
            disabled={
              updateVisibilityMutation.isPending ||
              updateVisibilityMutation.isSuccess
            }
          >
            <Send />
            Publicar
          </Button>
        )}
      </div>
    </div>
  );
};

export default PreviewBar;
