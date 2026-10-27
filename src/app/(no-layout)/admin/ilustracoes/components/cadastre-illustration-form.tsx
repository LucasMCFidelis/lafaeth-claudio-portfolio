"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  CadastreIllustrationDTO,
  cadastreIllustrationSchema,
} from "@/app/data/schemas/cadastre-illustration-schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePostIllustration } from "@/hooks/mutations/use-post-illustration";

import IllustrationFormFields from "./illustration-form-fields";

const CadastreIllustrationForm = () => {
  const form = useForm<CadastreIllustrationDTO>({
    resolver: zodResolver(cadastreIllustrationSchema),
    defaultValues: {
      description: "",
      redirectUrl: "",
      visibleInIllustrations: true,
    },
  });
  const postIllustrationMutation = usePostIllustration();

  function onSubmit(data: CadastreIllustrationDTO) {
    postIllustrationMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        toast.success("Ilustração cadastrada com sucesso");
      },
      onError: (error) =>
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao cadastrar ilustração"
        ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <IllustrationFormFields disabled={postIllustrationMutation.isPending}>
          <Button
            type="submit"
            className="w-full"
            disabled={postIllustrationMutation.isPending}
          >
            Cadastrar Ilustração
          </Button>
        </IllustrationFormFields>
      </form>
    </Form>
  );
};

export default CadastreIllustrationForm;
