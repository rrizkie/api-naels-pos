import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('item')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: '' })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
