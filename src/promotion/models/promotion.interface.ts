export interface Promotion {
  id: number;
  name: string;
  value: number;
  branch: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
}
