export type UserRole = 'customer' | 'admin';

export interface User {
  id?: number;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  userRole: UserRole;
  role_id: number;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface CreateUserDTO {
  full_name: string;
  email: string;
  phone_number: string;
  role_id: number;
  password: string;
}