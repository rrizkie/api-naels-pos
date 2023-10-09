export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
}
