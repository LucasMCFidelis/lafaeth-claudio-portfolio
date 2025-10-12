import { UserMediasUrlsDTO } from "./user-medias-dto";

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  description: string | null;
  birthDate: Date | null;
  age: number | null;
  whatsappMessage: string | null;
  whatsappNumber: number | null;
} & UserMediasUrlsDTO;
