export interface UserPost {
  id?: number;
  email: string;
  branch: string;
  role: string;
  username: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt?: Date;
}
