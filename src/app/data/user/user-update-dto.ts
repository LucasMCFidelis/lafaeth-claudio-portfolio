import z from "zod";

import { updateUserSchema } from "../schemas/update-user-schema";

export type UserUpdateDTO = z.infer<typeof updateUserSchema>;
