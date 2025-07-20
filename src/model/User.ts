export type UserRole = 'customer' | 'admin';

export interface User {
  id?: number;
  fullname: string;
  email: string;
  cellphone: string;
  role: string;
  userRole: UserRole;
  role_id: number;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface UserResponseDTO {
  user_id?: number;
  email: string;
  fullname: string;
  created_at: Date | null;
}

export type SafeUserCreate = Pick<User, 'fullname' | 'email' | 'cellphone' | 'role_id' | 'password'>
export type SafeUserResponse = Pick<User, 'email'> & any;