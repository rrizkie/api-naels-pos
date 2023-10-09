import { BRANCH, TRANSACTION_STATUS } from 'src/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
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

  @CreateDateColumn()
  createdAt: Date;
}

export class CreateTransactionResponse {
  message: string;
  data: TransactionEntity;
}

export class TransactionQuery {
  branch?: BRANCH;
  artist?: string;
  start_date?: Date | string;
  end_date?: Date | string;
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
