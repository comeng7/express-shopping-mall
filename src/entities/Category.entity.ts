import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Index,
} from 'typeorm';

import { Product } from '@/entities/Product.entity';
import { TCategoryCode } from '@/types/category.types';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, collation: 'utf8mb4_unicode_ci' })
  name!: string;

  @Column({
    type: 'varchar',
    length: 50,
    collation: 'utf8mb4_unicode_ci',
    unique: true,
    transformer: {
      to: (value: TCategoryCode) => value,
      from: (value: string) => value as TCategoryCode,
    },
  })
  @Index('idx_code')
  code!: TCategoryCode;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;

  @OneToMany(() => Product, product => product.category)
  products?: Product[];
}
