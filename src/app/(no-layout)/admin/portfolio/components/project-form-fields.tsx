"use client";

import { useFormContext } from "react-hook-form";

import { CadastreProjectInput } from "@/app/data/schemas/cadastre-project-schema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/helpers/slugify";

interface ProjectFormFieldsProps {
  disabled?: boolean;
  autoSlug?: boolean;
  children: React.ReactNode;
}

const ProjectFormFields = ({
  disabled,
  autoSlug,
  children,
}: ProjectFormFieldsProps) => {
  const form = useFormContext<CadastreProjectInput>();

  return (
    <div className="w-full grid items-start gap-4 md:grid-cols-2">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título</FormLabel>
            <FormControl>
              <Input
                placeholder="IDV Bocadas"
                disabled={disabled}
                {...field}
                onChange={(event) => {
                  field.onChange(event);
                  if (autoSlug && !form.getFieldState("slug").isDirty) {
                    form.setValue("slug", slugify(event.target.value));
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Endereço (slug)</FormLabel>
            <FormControl>
              <Input placeholder="idv-bocadas" disabled={disabled} {...field} />
            </FormControl>
            <FormDescription>/portfolio/{field.value || "..."}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="projectType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de projeto</FormLabel>
            <FormControl>
              <Input
                placeholder="Design de Marcas"
                disabled={disabled}
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 items-start gap-4">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Início</FormLabel>
              <FormControl>
                <Input type="month" disabled={disabled} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fim (opcional)</FormLabel>
              <FormControl>
                <Input
                  type="month"
                  disabled={disabled}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Conte um pouco sobre o projeto"
                className="min-h-28"
                disabled={disabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="visibleInProjects"
        render={({ field }) => (
          <FormItem className="flex items-center md:col-span-2">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
            </FormControl>
            <FormLabel>Exibir na página de portfólio</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-col gap-4 md:col-span-2">{children}</div>
    </div>
  );
};

export default ProjectFormFields;
