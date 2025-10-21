import { ROLE } from "@/constants/role";

export type Role = (typeof ROLE)[keyof typeof ROLE];

export interface UserType {
  id: number;
  name: string;
  email: string;
  role: Role;
  verified: boolean;
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: Role;
  verified: boolean;
}
