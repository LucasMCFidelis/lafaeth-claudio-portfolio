import z from "zod";

/** Content that can be shown or hidden on the site straight from its card. */
export const visibilityEntities = [
  "color",
  "comic",
  "flat",
  "illustration",
  "homeImage",
  "project",
  "projectImage",
] as const;

export type VisibilityEntity = (typeof visibilityEntities)[number];

export const updateVisibilitySchema = z.object({
  entity: z.enum(visibilityEntities),
  id: z.uuid("id invalido"),
  visible: z.boolean(),
});

export type UpdateVisibilityDTO = z.infer<typeof updateVisibilitySchema>;
