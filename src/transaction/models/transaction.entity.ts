import { BRANCH, TRANSACTION_STATUS } from 'src/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: '', enum: BRANCH, nullable: false })
  branch_name: string;

  @Column({ default: '', nullable: false })
  nail_artist: string;

  @Column({ default: '', nullable: true })
  promotion_name: string;

  @Column({ default: 0, nullable: true })
  promotion_value: number;

  @Column({ default: 0, nullable: true })
  downpayment: number;

  @Column({ default: 0, nullable: true })
  total_discount: number;

  @Column({ default: 0, nullable: false })
  total_transaction: number;

  @Column({ default: TRANSACTION_STATUS.UNPAID, enum: TRANSACTION_STATUS })
  status: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
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
