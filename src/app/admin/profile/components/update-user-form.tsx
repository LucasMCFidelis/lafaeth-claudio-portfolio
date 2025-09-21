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
      birthDate: formatDateToInput(initialData.birthDate),
    },
  });

  async function onSubmit(data: UserUpdateDTO) {
    const birthDate = new Date(data.birthDate);
    console.log({ ...data, birthDate });
    await updateUserDataMutation.mutateAsync(data, {
      onSuccess: () => toast.success("Perfil atualizado com sucesso"),
      onError: (error) =>
        toast.error(error.message || "Erro ao atualizar perfil"),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-7xl grid gap-6 md:gap-y-0 md:grid-cols-2 md:grid-rows-5"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="md:row-span-4 place-items-center md:gap-0">
              <FormLabel>Imagem</FormLabel>
              <ProfileImage src={field.value} alt={`Perfil ${field.name}`} />
              <FormControl>
                <Input placeholder="Url para sua foto de perfil" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            <FormItem>
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full max-w-lg md:col-span-full justify-self-center md:mt-5"
          disabled={updateUserDataMutation.isPending}
        >
          Atualizar
        </Button>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
