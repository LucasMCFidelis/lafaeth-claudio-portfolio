"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateUserSchema } from "@/app/data/schemas/update-user-schema";
import { UserDTO } from "@/app/data/user/user-dto";
import { UserUpdateDTO } from "@/app/data/user/user-update-dto";
import ProfileImage from "@/components/common/profile-image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDateToInput } from "@/helpers/format-date-to-input";
import { useUpdateUserData } from "@/hooks/mutations/use-update-user-data";

interface UpdateUserFormProps {
  initialData: UserDTO;
}

const UpdateUserForm = ({ initialData }: UpdateUserFormProps) => {
  const updateUserDataMutation = useUpdateUserData();
  const form = useForm<UserUpdateDTO>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: initialData.name,
      email: initialData.email,
      image: initialData.image || "",
      description: initialData.description || "",
      birthDate: initialData.birthDate
        ? formatDateToInput(initialData.birthDate)
        : null,
    },
  });

  async function onSubmit(data: UserUpdateDTO) {
    await updateUserDataMutation.mutateAsync(data, {
      onSuccess: () => toast.success("Perfil atualizado com sucesso"),
      onError: (error) =>
        toast.error(error.message || "Erro ao atualizar perfil"),
    });
  }

  const valueImageUrl = form.watch("image");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12 mx-auto"
      >
        <div className="flex flex-col lg:flex-row lg:col-span-2 gap-6">
          <ProfileImage
            src={valueImageUrl}
            alt="imagem do Perfil"
            className="mx-auto"
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="flex-1 h-fit lg:self-end">
                <FormLabel>Imagem</FormLabel>
                <FormControl>
                  <Input placeholder="Url para sua foto de perfil" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="lg:col-span-2">
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Data de Nascimento"
                  {...field}
                  value={field.value ?? ""} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full max-w-md lg:col-span-2 justify-self-center mt-4"
          disabled={updateUserDataMutation.isPending}
        >
          Atualizar
        </Button>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
