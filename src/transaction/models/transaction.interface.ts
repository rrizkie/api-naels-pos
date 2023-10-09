export interface Transaction {
  id?: number;
  branch_name: string;
  total_price: number;
  nail_artist_id: number;
  nail_artist: string;
  status: string;
  isDeleted: boolean;
  createdAt: Date;
}
