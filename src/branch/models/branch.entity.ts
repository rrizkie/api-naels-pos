import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('branch')
export class BranchEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
