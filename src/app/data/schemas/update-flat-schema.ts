import z from "zod";

import { cadastreFlatSchema } from "./cadastre-flat-schema";

export const updateFlatSchema = z
  .object({
    id: z.uuid("id invalido"),
    ...cadastreFlatSchema.shape,
  })
  .refine((data) => data.backImageId !== data.frontImageId, {
    message: "Imagem de flat e line não podem ser a mesma",
    path: ["frontImageId"],
  });

export type UpdateFlatDTO = z.infer<typeof updateFlatSchema>;
