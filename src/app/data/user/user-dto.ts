export interface UserDTO {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  description: string | null;
  birthDate: Date | null;
  age: number | null;
  instagram: string | null;
  behance: string | null;
  whatsappMessage: string | null;
  whatsappNumber: number | null;
  lattes: string | null;
}
