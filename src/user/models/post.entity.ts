import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_post')
export class UserPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', unique: true })
  email: string;

  @Column({ default: '' })
  branch: string;

  @Column({ default: '' })
  role: string;

  @Column({ default: '', unique: true })
  username: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
