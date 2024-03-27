import { Role } from "./Role";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: Role;
  token?: string;
  active: boolean;
}
