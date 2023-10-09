export interface Role {
  id?: number;
  name: string;
  permission: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: Date;
}
