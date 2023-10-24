import { BRANCH } from 'src/constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('promotion')
export class PromotionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: 0 })
  value: number;

  @Column({ default: '' })
  branch: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export class PromotionQuery {
  branch?: BRANCH;
  isActive?: boolean;
  page?: number;
  size?: number;
}

export class PromotionResponse {
  data: PromotionEntity[];
  total: number;
}
