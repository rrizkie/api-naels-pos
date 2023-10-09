import { BRANCH, TRANSACTION_STATUS } from 'src/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  branch_name: string;

  @Column({ default: 0 })
  total_price: number;

  @Column({ default: 0 })
  nail_artist_id: number;

  @Column({ default: '' })
  nail_artist: string;

  @Column({ default: TRANSACTION_STATUS.UNPAID })
  status: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export class TransactionQuery {
  branch?: BRANCH;
  artist?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  size?: number;
}
export class TransactionResponse {
  data: TransactionEntity[];
  total: number;
}

export class TransactionSummary {
  branch_name: string;
  total_transaction: number;
}

export class TransactionSummaryQuery {
  branch: BRANCH;
}

export class TransactionSummaryResponse {
  data: TransactionSummary[];
  total_transaction: number;
}
