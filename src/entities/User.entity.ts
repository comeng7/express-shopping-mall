import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 50 })
  phoneNumber!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ name: 'post_code', type: 'varchar', length: 20, nullable: true })
  postCode!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address!: string | null;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ name: 'user_id', type: 'varchar', length: 50, unique: true })
  userId!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
}
