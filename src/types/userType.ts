export interface User {
  name: string;
  email: string;
  id: number;
  phone?: string;
  username?: string;
  website?: string;
  address?: object
}

export type NewUser = Omit<User, "id">
