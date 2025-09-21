export interface UserDTO {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  description: string | null;
  birthDate: Date | null;
  age: number | null
}
