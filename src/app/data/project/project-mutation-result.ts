import { ProjectAdminDTO } from "./project-dto";

export type ProjectMutationResult =
  | { success: true; project: ProjectAdminDTO }
  | { success: false; slugTaken: true };
