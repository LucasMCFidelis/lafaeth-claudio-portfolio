import z from "zod";

import { cadastreComicSchema } from "./cadastre-comic-schema";

export const updateComicSchema = z.object({
  id: z.uuid("id invalido"),
  ...cadastreComicSchema.shape,
});

export type UpdateComicDTO = z.infer<typeof updateComicSchema>;
