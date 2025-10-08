import z from "zod";

import { cadastreImageSchema } from "./cadastre-image-schema";

export const updateImageSchema = z.object({
  id: z.uuid("id invalido"),
  ...cadastreImageSchema.shape,
});

export type UpdateImageDTO = z.infer<typeof updateImageSchema>;
