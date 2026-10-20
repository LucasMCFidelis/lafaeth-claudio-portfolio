"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  UpdateIllustrationDTO,
  updateIllustrationSchema,
} from "@/app/data/schemas/update-illustration-schema";
import { Form } from "@/components/ui/form";
import { useDeleteIllustration } from "@/hooks/mutations/use-delete-illustration";
import { useUpdateIllustration } from "@/hooks/mutations/use-update-illustration";
import { useIllustration } from "@/hooks/queries/use-illustrations";
import { useFormIsEditable } from "@/hooks/states/use-form-is-editable";

import ActionsUpdateForm from "../../components/actions-update-forms";
import DeleteItemButton from "../../components/delete-item-button";
import IllustrationFormFields from "./illustration-form-fields";

interface UpdateIllustrationFormProps {
  illustrationId: string;
}

const UpdateIllustrationForm = ({
  illustrationId,
}: UpdateIllustrationFormProps) => {
  const { data: illustration } = useIllustration(illustrationId);
  const updateIllustrationMutation = useUpdateIllustration(illustration.id);
  const deleteIllustrationMutation = useDeleteIllustration();
  const [formIsEditable, setFormIsEditable] = useFormIsEditable();

  const formDefaultValues: UpdateIllustrationDTO = {
    id: illustration.id,
    imageId: illustration.imageId ?? "",
    description: illustration.description ?? "",
    redirectUrl: illustration.redirectUrl ?? "",
    horizontalIllustration: illustration.horizontalIllustration,
    visibleInIllustrations: illustration.visibleInIllustrations,
  };

  const form = useForm<UpdateIllustrationDTO>({
    resolver: zodResolver(updateIllustrationSchema),
    defaultValues: formDefaultValues,
  });

  function onSubmit(data: UpdateIllustrationDTO) {
    updateIllustrationMutation.mutate(data, {
      onSuccess: () => toast.success("Ilustração atualizada com sucesso"),
      onError: (error) =>
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao atualizar ilustração"
        ),
    });
    setFormIsEditable(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <IllustrationFormFields
          disabled={!formIsEditable || updateIllustrationMutation.isPending}
        >
          <ActionsUpdateForm
            textSaveUpdateAction="Atualizar Ilustração"
            disableSaveUpdateAction={updateIllustrationMutation.isPending}
            resetForm={() => form.reset(formDefaultValues)}
          />
          <DeleteItemButton
            itemName="esta ilustração"
            onDelete={() =>
              deleteIllustrationMutation.mutateAsync(illustration.id)
            }
            redirectTo="/admin/ilustracoes"
            disabled={updateIllustrationMutation.isPending}
          />
        </IllustrationFormFields>
      </form>
    </Form>
  );
};

export default UpdateIllustrationForm;
